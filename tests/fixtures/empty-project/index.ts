import files from '@tests/fixtures/empty-project/files.json';
import projects from '@tests/fixtures/empty-project/projects.json';
import { fetchMock } from '@tests/support';

const baseUrl: string = 'https://api.localazy.com';

export const serverResponses = {
  projects,
  files,
};

export const mockResponses = (): void => {
  fetchMock.hardReset();
  fetchMock.mockGlobal();

  // projects
  fetchMock.get(`${baseUrl}/projects`, serverResponses.projects);

  // files
  fetchMock.get(`${baseUrl}/projects/_a0000000000000000002/files`, serverResponses.files);
};
