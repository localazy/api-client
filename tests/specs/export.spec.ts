import { ApiClient, ExportJsonRequest, File, I18nJson, Locales, Project } from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient } from '@tests/support';
import { beforeEach, describe, expect, test } from 'vitest';

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

    // simple keys remain direct properties
    expect(jsonExport.en.app_title).toBe('My Application');
    expect(jsonExport.en.welcome_message).toBe('Welcome to My Application!');
    expect(jsonExport.en.login_button).toBe('Log In');

    // nested keys (array of segments) become nested objects
    expect(jsonExport.en.headers.role).toBe('Project role');
    expect(jsonExport.en.headers.email).toBe('User email');

    // single-segment keys that contain dots remain flat (dot-notation key)
    expect(jsonExport.en['table.actions.invite']).toBe('Invite user');
    expect(jsonExport.en['table.actions.refresh']).toBe('Refresh data');
  });
});
