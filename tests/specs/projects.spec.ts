import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, Project } from '@/main';

describe('Projects', (): void => {
  let api: ApiClient;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.projects.list', async (): Promise<void> => {
    const projects: Project[] = await api.projects.list();

    expect(projects[0].name).toBe('Test project');
  });

  test('api.projects.first', async (): Promise<void> => {
    const project: Project = await api.projects.first();

    expect(project.name).toBe('Test project');
  });
});
