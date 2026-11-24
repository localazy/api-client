import type {
  ApiClient,
  KeyDetailsResponse,
  Project,
  ReviewTranslationResponse,
  SubmitTranslationResponse,
} from '@/main.js';
import { Locales } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const baseUrl: string = 'https://api.localazy.com/projects/_a0000000000000000001/keys';

const details: KeyDetailsResponse = {
  keys: [
    {
      id: '_a0000000000000000001',
      key: ['cart', 'item_count'],
      type: 'plural',
      file: { id: '_e000000000001', name: 'en.json', type: 'json' },
      deprecated: false,
      hidden: false,
      limit: -1,
      comment: 'Shown in the cart header.',
      contextNote: 'Number of items, not products.',
      priority: 'high',
      tags: [{ id: '_e40', name: 'High priority', builtIn: true }],
      source: {
        lang: 'en',
        value: { '@one': '%d item', '@other': '%d items' },
        pluralForms: ['one', 'other'],
      },
      translation: {
        lang: 'cs',
        state: { translated: true, needReview: true, sourceChanged: false, needImprovement: false },
        review: {
          versionId: '_v000000000000000002',
          value: { '@one': '%d kus', '@few': '%d kusy', '@other': '%d kusů' },
          userId: '_u000000000000000001',
        },
      },
      comments: [
        {
          id: '_c000000000000000001',
          userId: '_u000000000000000001',
          text: "Is 'kus' better here?",
          edited: false,
          updatedAt: '2026-11-12T09:41:00Z',
        },
      ],
    },
  ],
  errors: [{ id: '_a0000000000000000002', error: 'not_found' }],
};

const jsonInit = (method: string, body?: string): RequestInit => ({
  ...(body === undefined ? {} : { body }),
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
  method,
});

describe('Keys details, source and review', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(
      `${baseUrl}/details/zh%23Hans?ids=_a0000000000000000001%2C_a0000000000000000002`,
      details,
    );
    fetchMock.post(`${baseUrl}/_a0000000000000000001/source`, {
      result: true,
      versionId: '_v000000000000000003',
    });
    fetchMock.post(`${baseUrl}/_a0000000000000000001/translations/cs/review`, { result: true });
    fetchMock.post(`${baseUrl}/_a0000000000000000001/translations/zh%23Hans/review`, {
      result: false,
      message: 'The project is temporarily locked; please retry.',
    });

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.keys.getDetails', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: KeyDetailsResponse = await api.keys.getDetails({
      project,
      keys: [{ id: '_a0000000000000000001' }, '_a0000000000000000002'],
      lang: 'zh#Hans',
    });

    const key = assertNotNull(response.keys[0]);
    expect(key.translation.review?.versionId).toBe('_v000000000000000002');
    expect(key.comments[0]?.text).toBe("Is 'kus' better here?");
    expect(response.errors).toEqual([{ id: '_a0000000000000000002', error: 'not_found' }]);
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/details/zh%23Hans?ids=_a0000000000000000001%2C_a0000000000000000002`,
      jsonInit('GET'),
    );
  });

  test('api.keys.getDetails keeps caller params', async (): Promise<void> => {
    fetchMock.get(`${baseUrl}/details/cs?extra=1&ids=_a0000000000000000001`, details);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.getDetails(
      { project, keys: ['_a0000000000000000001'], lang: Locales.CZECH },
      { params: { extra: '1', ids: 'ignored' } },
    );

    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/details/cs?extra=1&ids=_a0000000000000000001`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('api.keys.getDetails rejects a missing key list or language', async (): Promise<void> => {
    await expect(
      // @ts-expect-error keys must be an array
      api.keys.getDetails({ project, keys: '_a0000000000000000001', lang: Locales.CZECH }),
    ).rejects.toThrow(TypeError);
    await expect(
      // @ts-expect-error lang is required
      api.keys.getDetails({ project, keys: ['_a0000000000000000001'], lang: undefined }),
    ).rejects.toThrow('Invalid lang language.');
  });

  test('api.keys.editSource', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: SubmitTranslationResponse = await api.keys.editSource({
      project,
      key: '_a0000000000000000001',
      value: { '@one': '%d item', '@other': '%d items' },
      sourceChanged: false,
    });

    expect(response).toEqual({ result: true, versionId: '_v000000000000000003' });
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/_a0000000000000000001/source`,
      jsonInit('POST', '{"value":{"one":"%d item","other":"%d items"},"sourceChanged":false}'),
    );
  });

  test('api.keys.editSource omits sourceChanged when not given', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.editSource({ project, key: '_a0000000000000000001', value: 'Save changes' });

    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/_a0000000000000000001/source`,
      jsonInit('POST', '{"value":"Save changes"}'),
    );
  });

  test('api.keys.reviewTranslation', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: ReviewTranslationResponse = await api.keys.reviewTranslation({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      versionId: '_v000000000000000002',
      action: 'approve',
    });

    expect(response).toEqual({ result: true });
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/_a0000000000000000001/translations/cs/review`,
      jsonInit('POST', '{"versionId":"_v000000000000000002","action":"approve"}'),
    );
  });

  test('api.keys.reviewTranslation surfaces result false', async (): Promise<void> => {
    const response: ReviewTranslationResponse = await api.keys.reviewTranslation({
      project,
      key: '_a0000000000000000001',
      lang: 'zh#Hans',
      versionId: '_v000000000000000002',
      action: 'reject',
    });

    expect(response.result).toBe(false);
    expect(response.message).toBe('The project is temporarily locked; please retry.');
  });
});
