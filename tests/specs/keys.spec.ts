import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient, mockAdapter } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, File, Key, KeyDeleteRequest, KeyUpdateRequest, Locales, Project } from '@/main';

describe('Keys', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.keys.update', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const request: KeyUpdateRequest = { project, key: keys[0], comment: 'Comment for translators.' };
    await api.keys.update(request);

    expect(mockAdapter.history.put.length).toBe(1);
    expect(mockAdapter.history.put[0].data).toMatchSnapshot();
  });

  test('api.keys.delete', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const request: KeyDeleteRequest = { project, key: keys[0] };
    await api.keys.delete(request);

    expect(mockAdapter.history.delete.length).toBe(1);
    expect(mockAdapter.history.delete[0].data).toMatchSnapshot();
  });
});
