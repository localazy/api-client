import type { ApiClient, GlossaryCreateManyResponse, Project } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const batchUrl: string = 'https://api.localazy.com/projects/_a0000000000000000001/glossary/batch';

describe('Glossary batch', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.post(batchUrl, {
      result: true,
      created: ['Save'],
      updated: ['Monitor'],
      skipped: [],
    });

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.glossary.createMany', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: GlossaryCreateManyResponse = await api.glossary.createMany({
      project,
      terms: [
        { term: [{ lang: 'en', term: 'Save' }], description: 'UI action' },
        {
          term: [
            { lang: 'en', term: 'Monitor' },
            { lang: 'cs', term: 'Monitor' },
          ],
          caseSensitive: true,
        },
      ],
    });

    expect(response).toEqual({
      result: true,
      created: ['Save'],
      updated: ['Monitor'],
      skipped: [],
    });
    expect(spy).toHaveBeenCalledWith(batchUrl, {
      body:
        '[{"term":[{"lang":"en","term":"Save"}],"description":"UI action"},' +
        '{"term":[{"lang":"en","term":"Monitor"},{"lang":"cs","term":"Monitor"}],"caseSensitive":true}]',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.glossary.createMany rejects a missing term list', async (): Promise<void> => {
    await expect(
      // @ts-expect-error terms must be an array
      api.glossary.createMany({ project, terms: undefined }),
    ).rejects.toThrow(TypeError);
  });
});
