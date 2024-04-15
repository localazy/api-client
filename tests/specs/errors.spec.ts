import { describe, expect, test } from 'vitest';
import { getApiClient } from '@tests/support';
import { fullProject, emptyProject } from '@tests/fixtures';
import { Project, ApiClient } from '@/main';

describe('Errors', (): void => {
  test('Update key with invalid id', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    let name: string | undefined;
    let message: string | undefined;
    let code: string | undefined;

    try {
      await api.keys.update({ project, key: 'unknown-key-id', comment: 'Key comment' });
    } catch (err: any) {
      name = err.name;
      message = err.message;
      code = err.code;
    }

    expect(name).toBe('LocalazyError');
    expect(message).toBe('invalid_id');
    expect(code).toBe(400);
  });

  test('Update key with random id', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    let name: string | undefined;
    let message: string | undefined;
    let code: string | undefined;

    try {
      await api.keys.update({ project, key: '_a1111111111111111111', comment: 'Key comment' });
    } catch (err: any) {
      name = err.name;
      message = err.message;
      code = err.code;
    }

    expect(name).toBe('LocalazyError');
    expect(message).toBe('unauthorized');
    expect(code).toBe(401);
  });

  test('Get first file in empty project', async (): Promise<void> => {
    emptyProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    let message: string | undefined;

    try {
      await api.files.first({ project });
      debugger;
    } catch (err: any) {
      debugger;
      message = err.message;
    }

    expect(message).toBe('File not found.');
  });
});
