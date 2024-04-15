import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient, mockAdapter } from '@tests/support';
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
    const json: I18nJson = { en: { headers: { person: 'Active person' } } };
    const request: ImportJsonRequest = { project, json, fileOptions: { name: 'en.json' } };
    await api.import.json(request);

    expect(mockAdapter.history.post.length).toBe(1);
    expect(mockAdapter.history.post[0].data).toMatchSnapshot();
  });
});
