import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, ExportJsonRequest, File, I18nJson, Locales, Project } from '@/main';

describe('Export', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.export.json', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: ExportJsonRequest = {
      project,
      file,
      langs: [Locales.ENGLISH],
    };
    const jsonExport: I18nJson = await api.export.json(request);

    expect(jsonExport.en.app_title).toBe('My Application');
  });
});
