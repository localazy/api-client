import { Project } from '~/main';

describe('Projects', (): void => {
  test('api.projects.list', async (): Promise<void> => {
    // test
    const projects: Project[] = await api.projects.list();

    // verify
    expect(projects[0].name).toBe('api-client jest');
  });

  test('api.projects.first', async (): Promise<void> => {
    // test
    const project: Project = await api.projects.first();

    // verify
    expect(project.name).toBe('api-client jest');
  });
});
