import fileDownload from '@tests/fixtures/full-project/fileDownload.json';
import fileKeys from '@tests/fixtures/full-project/fileKeys.json';
import files from '@tests/fixtures/full-project/files.json';
import formats from '@tests/fixtures/full-project/formats.json';
import glossary from '@tests/fixtures/full-project/glossary.json';
import projects from '@tests/fixtures/full-project/projects.json';
import projectsOrgsLangs from '@tests/fixtures/full-project/projectsOrgsLangs.json';
import screenshots from '@tests/fixtures/full-project/screenshots.json';
import screenshotTags from '@tests/fixtures/full-project/screenshotTags.json';
import webhooks from '@tests/fixtures/full-project/webhooks.json';
import webhooksSecret from '@tests/fixtures/full-project/webhooksSecret.json';
import { fetchMock } from '@tests/support';
import { assertNotNull } from '@tests/support/assert-not-null';

const baseUrl: string = 'https://api.localazy.com';

export const serverResponses = {
  formats,
  projects,
  projectsOrgsLangs,
  glossary,
  files,
  fileKeys,
  fileDownload,
  screenshots,
  screenshotTags,
  webhooks,
  webhooksSecret,
  resultPostScreenshot: {
    id: '_a0000000000000000001',
  },
  resultPost: {
    result: '_a0000000000000000001',
  },
  resultPut: {
    result: true,
  },
  resultDelete: {
    result: true,
  },
  resultInvalidId: {
    success: false,
    code: 400,
    error: 'invalid_id',
  },
  resultUnauthorized: {
    success: false,
    code: 401,
    message: 'You are not allowed to access this endpoint.',
    error: 'unauthorized',
  },
};

export const mockResponses = (): void => {
  fetchMock.hardReset();
  fetchMock.mockGlobal();

  // formats
  fetchMock.get(`${baseUrl}/import/formats`, serverResponses.formats);

  // projects
  fetchMock.get(`${baseUrl}/projects`, serverResponses.projects);
  fetchMock.get(
    `${baseUrl}/projects?languages=true&organization=true`,
    serverResponses.projectsOrgsLangs,
  );

  // glossary
  fetchMock.get(`${baseUrl}/projects/_a0000000000000000001/glossary`, serverResponses.glossary);
  const firstGlossary = assertNotNull(serverResponses.glossary.glossaries[0]);
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/glossary/_a0000000000000000001`,
    firstGlossary,
  );
  fetchMock.post(`${baseUrl}/projects/_a0000000000000000001/glossary`, serverResponses.resultPost);
  fetchMock.put(
    `${baseUrl}/projects/_a0000000000000000001/glossary/_a0000000000000000001`,
    serverResponses.resultPut,
  );
  fetchMock.delete(
    `${baseUrl}/projects/_a0000000000000000001/glossary/_a0000000000000000001`,
    serverResponses.resultDelete,
  );

  // files
  fetchMock.get(`${baseUrl}/projects/_a0000000000000000001/files`, serverResponses.files);
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/files/_e000000000001/download/en`,
    serverResponses.fileDownload,
  );

  // keys
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/files/_e000000000001/keys/en`,
    serverResponses.fileKeys,
  );
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/files/_e000000000001/keys/en?next=`,
    serverResponses.fileKeys,
  );
  fetchMock.put(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001`,
    serverResponses.resultPut,
  );
  fetchMock.delete(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001`,
    serverResponses.resultDelete,
  );

  // import
  fetchMock.post(`${baseUrl}/projects/_a0000000000000000001/import`, serverResponses.resultPost);

  // screenshots
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/screenshots`,
    serverResponses.screenshots,
  );
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/screenshots/tags`,
    serverResponses.screenshotTags,
  );
  fetchMock.post(
    `${baseUrl}/projects/_a0000000000000000001/screenshots`,
    serverResponses.resultPostScreenshot,
  );
  fetchMock.post(
    `${baseUrl}/projects/_a0000000000000000001/screenshots/_a0000000000000000001`,
    serverResponses.resultPost,
  );
  fetchMock.put(
    `${baseUrl}/projects/_a0000000000000000001/screenshots/_a0000000000000000001`,
    serverResponses.resultPut,
  );
  fetchMock.delete(
    `${baseUrl}/projects/_a0000000000000000001/screenshots/_a0000000000000000001`,
    serverResponses.resultDelete,
  );

  // webhooks
  fetchMock.get(`${baseUrl}/projects/_a0000000000000000001/webhooks`, serverResponses.webhooks);
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/webhooks/secret`,
    serverResponses.webhooksSecret,
  );
  fetchMock.post(`${baseUrl}/projects/_a0000000000000000001/webhooks`, serverResponses.resultPost);

  // errors
  fetchMock.put(`${baseUrl}/projects/_a0000000000000000001/keys/unknown-key-id`, {
    status: 400,
    body: serverResponses.resultInvalidId,
  });
  fetchMock.put(`${baseUrl}/projects/_a0000000000000000001/keys/_a1111111111111111111`, {
    status: 401,
    body: serverResponses.resultUnauthorized,
  });
};
