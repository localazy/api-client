import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient, mockAdapter } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import {
  ApiClient,
  GlossaryCreateRequest,
  GlossaryDeleteRequest,
  GlossaryRecord,
  GlossaryUpdateRequest,
  Project,
} from '@/main';

describe('Glossary', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.glossary.list', async (): Promise<void> => {
    const records: GlossaryRecord[] = await api.glossary.list({ project });

    expect(records[0].term[0].term).toBe('Monitor');
    expect(records[0].description).toBe('A screen used for displaying visual output from a computer.');
  });

  test('api.glossary.find', async (): Promise<void> => {
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const record: GlossaryRecord = await api.glossary.find({ project, glossaryRecord: records[0].id });

    expect(record.term[0].term).toBe('Monitor');
    expect(record.description).toBe('A screen used for displaying visual output from a computer.');
  });

  test('api.glossary.create', async (): Promise<void> => {
    const request: GlossaryCreateRequest = {
      project,
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [{ lang: 'en', term: 'Exceptional term' }],
    };
    const recordId: string = await api.glossary.create(request);

    expect(recordId).toBe(fullProject.serverResponses.resultPost.result);
  });

  test('api.glossary.update', async (): Promise<void> => {
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const request: GlossaryUpdateRequest = {
      project,
      glossaryRecord: records[0],
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [{ lang: 'en', term: 'Exceptional term' }],
    };
    await api.glossary.update(request);

    expect(mockAdapter.history.put.length).toBe(1);
    expect(mockAdapter.history.put[0].data).toMatchSnapshot();
  });

  test('api.glossary.delete', async (): Promise<void> => {
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const request: GlossaryDeleteRequest = { project, glossaryRecord: records[0] };
    await api.glossary.delete(request);

    expect(mockAdapter.history.delete.length).toBe(1);
    expect(mockAdapter.history.delete[0].data).toMatchSnapshot();
  });
});
