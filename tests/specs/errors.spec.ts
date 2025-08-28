import type { ApiClient, Project } from '@/main.js';
import { emptyProject, fullProject } from '@tests/fixtures/index.js';
import { getApiClient } from '@tests/support/index.js';
import { describe, expect, test } from 'vitest';

describe('Errors', (): void => {
  test('Update key with invalid id', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    await expect(async (): Promise<void> => {
      await api.keys.update({ project, key: 'unknown-key-id', comment: 'Key comment' });
    }).rejects.toThrowError('Request failed with status code 400: invalid_id');
  });

  test('Update key with random id', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    await expect(async (): Promise<void> => {
      await api.keys.update({ project, key: '_a1111111111111111111', comment: 'Key comment' });
    }).rejects.toThrowError('Request failed with status code 401: unauthorized');
  });

  test('Get first file in empty project', async (): Promise<void> => {
    emptyProject.mockResponses();
    const api: ApiClient = getApiClient();
    const project: Project = await api.projects.first();

    let message: string | undefined;

    try {
      await api.files.first({ project });
    } catch (err: any) {
      message = err.message;
    }

    expect(message).toBe('File not found.');
  });
});
