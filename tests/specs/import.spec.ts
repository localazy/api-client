import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest';
import { getApiClient, getToken } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, I18nJson, ImportJsonRequest, Project } from '@/main';

describe('Import', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.import.json', async (): Promise<void> => {
    const json: I18nJson = { en: { headers: { person: 'Active person' }, 99: { luft: 'baloons' } } };
    const request: ImportJsonRequest = { project, json, fileOptions: { name: 'en.json' } };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.import.json(request);

    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/import', {
      // eslint-disable-next-line max-len
      body: '{"files":[{"name":"en.json","content":{"type":"json","en":{"99":{"luft":"baloons"},"headers":{"person":"Active person"}}}}]}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });
});
