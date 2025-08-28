import type { ApiClient, Project } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient } from '@tests/support/index.js';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Projects', (): void => {
  let api: ApiClient;

  beforeEach((): void => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.projects.list', async (): Promise<void> => {
    const projects: Project[] = await api.projects.list();

    const firstProject = assertNotNull(projects[0]);
    expect(firstProject.name).toBe('Test project');
  });

  test('api.projects.list | organization and languages', async (): Promise<void> => {
    const projects: Project[] = await api.projects.list({ languages: true, organization: true });

    const firstProject = assertNotNull(projects[0]);
    expect(firstProject.name).toBe('Test project');
  });

  test('api.projects.first', async (): Promise<void> => {
    const project: Project = await api.projects.first();

    expect(project.name).toBe('Test project');
  });
});
