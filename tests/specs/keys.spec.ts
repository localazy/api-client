import { ApiClient, File, Key, KeyDeleteRequest, KeyUpdateRequest, Locales, Project } from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient, getToken } from '@tests/support';
import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest';

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
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.update(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001',
      {
        body: '{"comment":"Comment for translators."}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.keys.delete', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const request: KeyDeleteRequest = { project, key: keys[0] };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.delete(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      },
    );
  });
});
