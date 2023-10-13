import { ApiClient, Project } from '~/main';

beforeAll(async (): Promise<void> => {
  // This is run before each test file.

  const apiUrl: string = process.env.LOCALAZY_API_URL || '';
  const authToken: string = process.env.LOCALAZY_API_AUTH_TOKEN || '';

  if (!apiUrl || !authToken) {
    throw new Error('[jest-setup] Missing ENV variables.');
  }

  const api: ApiClient = new ApiClient({ apiUrl, authToken });
  const project: Project = await api.projects.first()
    .catch(() => {
      throw new Error('[jest-setup] Failed to fetch project.');
    });

  global.api = api;
  global.project = project;
});
