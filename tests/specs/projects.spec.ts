import type { ApiClient, Project } from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient } from '@tests/support';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Projects', (): void => {
  let api: ApiClient;

  beforeEach((): void => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.projects.list', async (): Promise<void> => {
    const projects: Project[] = await api.projects.list();

    expect(projects[0].name).toBe('Test project');
  });

  test('api.projects.list | organization and languages', async (): Promise<void> => {
    const projects: Project[] = await api.projects.list({ languages: true, organization: true });

    expect(projects[0].name).toBe('Test project');
  });

  test('api.projects.first', async (): Promise<void> => {
    const project: Project = await api.projects.first();

    expect(project.name).toBe('Test project');
  });
});
