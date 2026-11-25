import type { ApiClient, Project, ProjectTag } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getApiUrl, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const tagsUrl: string = `${getApiUrl()}/projects/_a0000000000000000001/tags`;

const tags: ProjectTag[] = [
  { id: '_e40', name: 'High priority', type: 'generic', builtIn: true },
  { id: '_e845123154101354564', name: 'android-extra', type: 'file', builtIn: false },
];

describe('Tags', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(tagsUrl, tags);

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.tags.list', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: ProjectTag[] = await api.tags.list({ project });

    expect(result).toEqual(tags);
    expect(spy).toHaveBeenCalledWith(tagsUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });
});
