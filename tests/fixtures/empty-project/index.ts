import { fetchMock } from '@tests/support';
import projects from '@tests/fixtures/empty-project/projects.json';
import files from '@tests/fixtures/empty-project/files.json';

const baseUrl: string = 'https://api.localazy.com';

export const serverResponses = {
  projects,
  files,
};

export const mockResponses = (): void => {
  fetchMock.reset();

  // projects
  fetchMock.get(`${baseUrl}/projects`, serverResponses.projects);

  // files
  fetchMock.get(`${baseUrl}/projects/_a0000000000000000002/files`, serverResponses.files);
};
