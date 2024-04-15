import { mockAdapter } from '@tests/support/axios-mock-adapter';
import projects from '@tests/fixtures/empty-project/projects.json';
import files from '@tests/fixtures/empty-project/files.json';

export const serverResponses = {
  projects,
  files,
};

export const mockResponses = (): void => {
  mockAdapter.reset();

  // projects
  mockAdapter.onGet('/projects').reply(200, JSON.stringify(serverResponses.projects));

  // files
  mockAdapter.onGet('/projects/_a0000000000000000002/files').reply(200, JSON.stringify(serverResponses.files));
};
