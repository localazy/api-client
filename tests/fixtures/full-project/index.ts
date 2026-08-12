import aiTranslate from '@tests/fixtures/full-project/aiTranslate.json' with { type: 'json' };
import aiTranslatePlurals from '@tests/fixtures/full-project/aiTranslatePlurals.json' with { type: 'json' };
import fileDownload from '@tests/fixtures/full-project/fileDownload.json' with { type: 'json' };
import fileKeys from '@tests/fixtures/full-project/fileKeys.json' with { type: 'json' };
import fileKeysWithEvents from '@tests/fixtures/full-project/fileKeysWithEvents.json' with { type: 'json' };
import files from '@tests/fixtures/full-project/files.json' with { type: 'json' };
import formats from '@tests/fixtures/full-project/formats.json' with { type: 'json' };
import glossary from '@tests/fixtures/full-project/glossary.json' with { type: 'json' };
import projects from '@tests/fixtures/full-project/projects.json' with { type: 'json' };
import projectsOrgsLangs from '@tests/fixtures/full-project/projectsOrgsLangs.json' with { type: 'json' };
import screenshots from '@tests/fixtures/full-project/screenshots.json' with { type: 'json' };
import screenshotTags from '@tests/fixtures/full-project/screenshotTags.json' with { type: 'json' };
import suggestionsAi from '@tests/fixtures/full-project/suggestionsAi.json' with { type: 'json' };
import suggestionsMt from '@tests/fixtures/full-project/suggestionsMt.json' with { type: 'json' };
import suggestionsMtDisabled from '@tests/fixtures/full-project/suggestionsMtDisabled.json' with { type: 'json' };
import suggestionsTm from '@tests/fixtures/full-project/suggestionsTm.json' with { type: 'json' };
import webhooks from '@tests/fixtures/full-project/webhooks.json' with { type: 'json' };
import webhooksSecret from '@tests/fixtures/full-project/webhooksSecret.json' with { type: 'json' };
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { fetchMock } from '@tests/support/index.js';

const baseUrl: string = 'https://api.localazy.com';

export const serverResponses = {
  aiTranslate,
  aiTranslatePlurals,
  formats,
  projects,
  projectsOrgsLangs,
  glossary,
  files,
  fileKeys,
  fileKeysWithEvents,
  fileDownload,
  screenshots,
  screenshotTags,
  suggestionsTm,
  suggestionsMt,
  suggestionsMtDisabled,
  suggestionsAi,
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
  resultSubmitTranslation: {
    result: true,
    versionId: '_v000000000000000001',
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

  // ai translate
  fetchMock.post(`${baseUrl}/projects/_a0000000000000000001/ai`, serverResponses.aiTranslate);

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
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/files/_e000000000001/keys/en?event=true&next=`,
    serverResponses.fileKeysWithEvents,
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

  // suggestions
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/suggestions/mt?extra=1&to=cs`,
    serverResponses.suggestionsMt,
  );
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/suggestions/tm?to=cs`,
    serverResponses.suggestionsTm,
  );
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/suggestions/mt?to=cs`,
    serverResponses.suggestionsMt,
  );
  fetchMock.get(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/suggestions/mt?to=112&from=85`,
    serverResponses.suggestionsMtDisabled,
  );
  fetchMock.post(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/suggestions/ai`,
    serverResponses.suggestionsAi,
  );

  // translations
  fetchMock.post(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/zh%23Hans`,
    serverResponses.resultSubmitTranslation,
  );
  fetchMock.post(
    `${baseUrl}/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/cs`,
    serverResponses.resultSubmitTranslation,
  );

  // tags & priority
  fetchMock.put(`${baseUrl}/projects/_a0000000000000000001/keys/tags`, serverResponses.resultPut);
  fetchMock.put(
    `${baseUrl}/projects/_a0000000000000000001/keys/priority`,
    serverResponses.resultPut,
  );

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
