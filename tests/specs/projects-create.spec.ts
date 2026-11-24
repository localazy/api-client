import type { ApiClient, ProjectCreateRequest, ProjectCreateResponse } from '@/main.js';
import { ProjectTone, ProjectType } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Projects create', (): void => {
  let api: ApiClient;

  beforeEach((): void => {
    fullProject.mockResponses();
    fetchMock.post('https://api.localazy.com/projects', { projectId: '_a6458449029643106570' });

    api = getApiClient();
  });

  test('api.projects.create', async (): Promise<void> => {
    const request: ProjectCreateRequest = {
      name: 'My Application',
      slug: 'my-application',
      sourceLanguage: 'en',
      type: ProjectType.PUBLIC,
      tone: ProjectTone.INFORMAL,
      description: 'Mobile app localization.',
      useShareTm: false,
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: ProjectCreateResponse = await api.projects.create(request);

    expect(response).toEqual({ projectId: '_a6458449029643106570' });
    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects', {
      body: '{"name":"My Application","slug":"my-application","sourceLanguage":"en","type":"public","tone":"informal","description":"Mobile app localization.","useShareTm":false}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.projects.create with a numeric source language', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.projects.create({ name: 'My Application', sourceLanguage: 85 });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects',
      expect.objectContaining({
        body: '{"name":"My Application","sourceLanguage":"85"}',
        method: 'POST',
      }),
    );
  });

  test('api.projects.create with only a name', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.projects.create({ name: 'My Application' });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects',
      expect.objectContaining({ body: '{"name":"My Application"}', method: 'POST' }),
    );
  });
});
