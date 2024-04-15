import fileDownload from '@tests/fixtures/full-project/fileDownload.json';
import fileKeys from '@tests/fixtures/full-project/fileKeys.json';
import files from '@tests/fixtures/full-project/files.json';
import formats from '@tests/fixtures/full-project/formats.json';
import glossary from '@tests/fixtures/full-project/glossary.json';
import projects from '@tests/fixtures/full-project/projects.json';
import screenshots from '@tests/fixtures/full-project/screenshots.json';
import screenshotTags from '@tests/fixtures/full-project/screenshotTags.json';
import { textToUint8Array } from '@tests/support/utils';
import webhooks from '@tests/fixtures/full-project/webhooks.json';
import webhooksSecret from '@tests/fixtures/full-project/webhooksSecret.json';
import { mockAdapter } from '@tests/support/axios-mock-adapter';

export const serverResponses = {
  formats,
  projects,
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
  mockAdapter.reset();

  // formats
  mockAdapter.onGet('/import/formats').reply(200, JSON.stringify(serverResponses.formats));

  // projects
  mockAdapter.onGet('/projects').reply(200, JSON.stringify(serverResponses.projects));

  // glossary
  mockAdapter.onGet('/projects/_a0000000000000000001/glossary').reply(200, JSON.stringify(serverResponses.glossary));
  mockAdapter
    .onGet('/projects/_a0000000000000000001/glossary/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.glossary.glossaries[0]));
  mockAdapter.onPost('/projects/_a0000000000000000001/glossary').reply(200, JSON.stringify(serverResponses.resultPost));
  mockAdapter
    .onPut('/projects/_a0000000000000000001/glossary/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultPut));
  mockAdapter
    .onDelete('/projects/_a0000000000000000001/glossary/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultDelete));

  // files
  mockAdapter.onGet('/projects/_a0000000000000000001/files').reply(200, JSON.stringify(serverResponses.files));
  mockAdapter
    .onGet('/projects/_a0000000000000000001/files/_e000000000001/keys/en')
    .reply(200, JSON.stringify(serverResponses.fileKeys));
  mockAdapter
    .onGet('/projects/_a0000000000000000001/files/_e000000000001/download/en')
    .reply(200, textToUint8Array(serverResponses.fileDownload));

  // keys
  mockAdapter
    .onPut('/projects/_a0000000000000000001/keys/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultPut));
  mockAdapter
    .onDelete('/projects/_a0000000000000000001/keys/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultDelete));

  // import
  mockAdapter.onPost('/projects/_a0000000000000000001/import').reply(200, JSON.stringify(serverResponses.resultPost));

  // screenshots
  mockAdapter
    .onGet('/projects/_a0000000000000000001/screenshots')
    .reply(200, JSON.stringify(serverResponses.screenshots));
  mockAdapter
    .onGet('/projects/_a0000000000000000001/screenshots/tags')
    .reply(200, JSON.stringify(serverResponses.screenshotTags));
  mockAdapter
    .onPost('/projects/_a0000000000000000001/screenshots')
    .reply(200, JSON.stringify(serverResponses.resultPostScreenshot));
  mockAdapter
    .onPost('/projects/_a0000000000000000001/screenshots/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultPost));
  mockAdapter
    .onPut('/projects/_a0000000000000000001/screenshots/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultPut));
  mockAdapter
    .onDelete('/projects/_a0000000000000000001/screenshots/_a0000000000000000001')
    .reply(200, JSON.stringify(serverResponses.resultDelete));

  // webhooks
  mockAdapter.onGet('/projects/_a0000000000000000001/webhooks').reply(200, JSON.stringify(serverResponses.webhooks));
  mockAdapter
    .onGet('/projects/_a0000000000000000001/webhooks/secret')
    .reply(200, JSON.stringify(serverResponses.webhooksSecret));
  mockAdapter.onPost('/projects/_a0000000000000000001/webhooks').reply(200, JSON.stringify(serverResponses.resultPost));

  // errors
  mockAdapter
    .onPut('/projects/_a0000000000000000001/keys/unknown-key-id')
    .reply(400, JSON.stringify(serverResponses.resultInvalidId));
  mockAdapter
    .onPut('/projects/_a0000000000000000001/keys/_a1111111111111111111')
    .reply(401, JSON.stringify(serverResponses.resultUnauthorized));
};
