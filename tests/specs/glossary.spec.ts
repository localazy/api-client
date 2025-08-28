import type {
  ApiClient,
  GlossaryCreateRequest,
  GlossaryDeleteRequest,
  GlossaryRecord,
  GlossaryUpdateRequest,
  Project,
} from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient, getToken } from '@tests/support';
import type { MockInstance} from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

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
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const record: GlossaryRecord = await api.glossary.find({ project, glossaryRecord: records[0].id });

    expect(record.term[0].term).toBe('Monitor');
    expect(record.description).toBe('A screen used for displaying visual output from a computer.');
    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/glossary/_a0000000000000000001',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );
  });

  test('api.glossary.create', async (): Promise<void> => {
    const request: GlossaryCreateRequest = {
      project,
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [{ lang: 'en', term: 'Exceptional term' }],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const recordId: string = await api.glossary.create(request);

    expect(recordId).toBe(fullProject.serverResponses.resultPost.result);
    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/glossary', {
      body: '{"description":"Exceptional term description","caseSensitive":true,"translateTerm":true,"term":[{"lang":"en","term":"Exceptional term"}]}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
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
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.glossary.update(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/glossary/_a0000000000000000001',
      {
        body: '{"description":"Exceptional term description","caseSensitive":true,"translateTerm":true,"term":[{"lang":"en","term":"Exceptional term"}]}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.glossary.delete', async (): Promise<void> => {
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const request: GlossaryDeleteRequest = { project, glossaryRecord: records[0] };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.glossary.delete(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/glossary/_a0000000000000000001',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      },
    );
  });
});
