import type {
  ApiClient,
  BooleanResult,
  CdnMetadata,
  LanguageAddResponse,
  LanguageCopyResponse,
  LanguageKey,
  LanguageKeysPaginated,
  Plurals,
  Project,
  PublishedRecord,
  Styleguides,
} from '@/main.js';
import { Locales } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import languageKeys from '@tests/fixtures/full-project/languageKeys.json' with { type: 'json' };
import languageKeysLastPage from '@tests/fixtures/full-project/languageKeysLastPage.json' with { type: 'json' };
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const baseUrl: string = 'https://api.localazy.com/projects/_a0000000000000000001';

const requestInit = (method: string, body?: string): RequestInit => ({
  ...(body === undefined ? {} : { body }),
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
  method,
});

describe('Languages', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.languages.add', async (): Promise<void> => {
    const response: LanguageAddResponse = {
      result: true,
      languages: [
        { id: 1065, code: 'pt_BR', state: 'created' },
        { id: 60, code: 'cs', state: 'restored' },
      ],
    };
    fetchMock.post(`${baseUrl}/languages`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: LanguageAddResponse = await api.languages.add({
      project,
      languages: [Locales.BRAZILIAN_PORTUGUESE, 60],
    });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/languages`,
      requestInit('POST', '{"languages":["pt_BR","60"]}'),
    );
  });

  test.each([
    ['hide', 'hidden'],
    ['enable', 'enabled'],
    ['disable', 'disabled'],
  ] as const)('api.languages.%s', async (method, state): Promise<void> => {
    const response = { result: true, languages: [{ id: 60, code: 'cs', state }] };
    fetchMock.post(`https://api.localazy.com/projects/test-project/languages/${method}`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result = await api.languages[method]({ project: 'test-project', languages: ['cs'] });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/test-project/languages/${method}`,
      requestInit('POST', '{"languages":["cs"]}'),
    );
  });

  test('api.languages.hide rejects a non-array', async (): Promise<void> => {
    await expect(
      // @ts-expect-error languages must be an array
      api.languages.hide({ project, languages: 'cs' }),
    ).rejects.toThrow('Invalid language list');
  });

  test('api.languages.delete', async (): Promise<void> => {
    fetchMock.delete(`${baseUrl}/languages/zh%23Hans`, { result: true });
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: BooleanResult = await api.languages.delete({ project, lang: 'zh#Hans' });

    expect(result.result).toBe(true);
    expect(spy).toHaveBeenCalledWith(`${baseUrl}/languages/zh%23Hans`, requestInit('DELETE'));
  });

  test('api.languages.delete requires a language', async (): Promise<void> => {
    await expect(api.languages.delete({ project, lang: '' })).rejects.toThrow(
      'Invalid lang language.',
    );
  });

  test('api.languages.copy', async (): Promise<void> => {
    const response: LanguageCopyResponse = {
      result: true,
      language: { id: 1064, code: 'pt_PT', state: 'created' },
    };
    fetchMock.post(`${baseUrl}/languages/copy`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: LanguageCopyResponse = await api.languages.copy({
      project,
      from: Locales.BRAZILIAN_PORTUGUESE,
      to: 'pt_PT',
    });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/languages/copy`,
      requestInit('POST', '{"from":"pt_BR","to":"pt_PT"}'),
    );
  });

  test('api.languages.replace', async (): Promise<void> => {
    fetchMock.post(`${baseUrl}/languages/replace`, { result: true });
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: BooleanResult = await api.languages.replace({
      project,
      language: 'de',
      replaceWith: 'de_AT',
    });

    expect(result.result).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/languages/replace`,
      requestInit('POST', '{"language":"de","replaceWith":"de_AT"}'),
    );
  });

  test('api.languages.setFallback', async (): Promise<void> => {
    fetchMock.put(`${baseUrl}/languages/pt_PT/fallback`, { result: true });
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: BooleanResult = await api.languages.setFallback({
      project,
      lang: 'pt_PT',
      fallback: Locales.BRAZILIAN_PORTUGUESE,
    });

    expect(result.result).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/languages/pt_PT/fallback`,
      requestInit('PUT', '{"fallback":"pt_BR"}'),
    );
  });

  test('api.languages.setFallback removes the fallback', async (): Promise<void> => {
    fetchMock.put(`${baseUrl}/languages/pt_PT/fallback`, { result: true });
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    await api.languages.setFallback({ project, lang: 'pt_PT', fallback: null });

    expect(spy).toHaveBeenCalledWith(
      `${baseUrl}/languages/pt_PT/fallback`,
      requestInit('PUT', '{"fallback":null}'),
    );
  });

  test('api.languages.listKeysPage', async (): Promise<void> => {
    const url: string = `${baseUrl}/languages/cs/keys?limit=2&extra_info=true&resolve_duplicities=false`;
    fetchMock.get(url, languageKeys);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const page: LanguageKeysPaginated = await api.languages.listKeysPage({
      project,
      lang: Locales.CZECH,
      limit: 2,
      extra_info: true,
      resolve_duplicities: false,
      deprecated: undefined,
    });

    expect(spy).toHaveBeenCalledWith(url, requestInit('GET'));
    expect(page.next).toBe('e4f7a2c1d5');
    expect(page.keys[1]?.file).toBe('_e000000000002');
    expect(Object.values(page.files).map((file) => file.name)).toEqual(['home.json', 'cart.json']);
  });

  test('api.languages.listKeysPage keeps the params of the config', async (): Promise<void> => {
    const url: string = `${baseUrl}/languages/cs/keys?trace=1&limit=2`;
    fetchMock.get(url, languageKeys);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    await api.languages.listKeysPage(
      { project, lang: Locales.CZECH, limit: 2 },
      { params: { trace: '1' } },
    );

    expect(spy).toHaveBeenCalledWith(url, requestInit('GET'));
  });

  test('api.languages.listKeys walks all pages', async (): Promise<void> => {
    fetchMock.get(`${baseUrl}/languages/cs/keys`, languageKeys);
    fetchMock.get(`${baseUrl}/languages/cs/keys?next=e4f7a2c1d5`, languageKeysLastPage);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const keys: LanguageKey[] = await api.languages.listKeys({ project, lang: Locales.CZECH });

    expect(keys.map((key) => key.id)).toEqual([
      '_a0000000000000000001',
      '_a0000000000000000002',
      '_a0000000000000000003',
    ]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(
      `${baseUrl}/languages/cs/keys?next=e4f7a2c1d5`,
      requestInit('GET'),
    );
  });

  test('api.files.listPublished', async (): Promise<void> => {
    const response: PublishedRecord[] = [
      { tagId: '_e0', name: 'latest', publishedAt: '2026-11-13T02:15:00.123456Z' },
      { tagId: '_e845123154101354999', name: 'beta', publishedAt: null },
    ];
    fetchMock.get(`${baseUrl}/published`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: PublishedRecord[] = await api.files.listPublished({ project });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(`${baseUrl}/published`, requestInit('GET'));
  });

  test('api.languages.listPlurals', async (): Promise<void> => {
    const response: Plurals = {
      rules: [{ language: 'fr', exact: false, forms: ['zero', 'one', 'other'] }],
      languages: [
        {
          lang: 'cs',
          forms: ['one', 'few', 'other'],
          override: false,
          samples: { one: { integer: '1' }, few: { integer: '2~4' } },
        },
        { lang: 'fr_CA', forms: ['zero', 'one', 'other'], override: true },
      ],
    };
    fetchMock.get(`${baseUrl}/plurals`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: Plurals = await api.languages.listPlurals({ project });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(`${baseUrl}/plurals`, requestInit('GET'));
  });

  test('api.projects.list with hidden languages', async (): Promise<void> => {
    fetchMock.get('https://api.localazy.com/projects?hidden_languages=true', []);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    await api.projects.list({ hidden_languages: true });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects?hidden_languages=true',
      requestInit('GET'),
    );
  });
});

describe('Styleguides', (): void => {
  test('api.styleguides.list', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const response: Styleguides = {
      general: 'Use a friendly tone.',
      languages: { cs: 'Tykej uživateli.' },
    };
    fetchMock.get(`${baseUrl}/styleguides`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: Styleguides = await api.styleguides.list({ project: '_a0000000000000000001' });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(`${baseUrl}/styleguides`, requestInit('GET'));
  });
});

describe('CDN', (): void => {
  test('api.cdn.list', async (): Promise<void> => {
    fullProject.mockResponses();
    const api: ApiClient = getApiClient();
    const response: CdnMetadata = {
      enabled: true,
      metadataUrls: [
        {
          tagId: '_e0',
          tagName: 'latest',
          metadataUrl: 'https://delivery.localazy.com/_a64584490296431065702cd54241/_e0.v2.json',
        },
      ],
    };
    fetchMock.get(`${baseUrl}/cdn`, response);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    const result: CdnMetadata = await api.cdn.list({ project: '_a0000000000000000001' });

    expect(result).toEqual(response);
    expect(spy).toHaveBeenCalledWith(`${baseUrl}/cdn`, requestInit('GET'));
  });
});
