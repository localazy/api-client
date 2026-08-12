import type {
  AiSuggestionsResponse,
  ApiClient,
  MtSuggestionsResponse,
  Project,
  SuggestionsRequest,
  TmSuggestionsResponse,
} from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const KEY_ID: string = '_a0000000000000000001';

const jsonHeaders = (): Record<string, string> => ({
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

describe('Suggestions', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.suggestions.tm', async (): Promise<void> => {
    const request: SuggestionsRequest = { project, key: KEY_ID, to: 'cs' };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: TmSuggestionsResponse = await api.suggestions.tm(request);

    expect(response.enabled).toBe(true);
    const firstItem = assertNotNull(response.items[0]);
    expect(firstItem.source).toBe('Save changes');
    const firstSuggestion = assertNotNull(firstItem.suggestions[0]);
    expect(firstSuggestion.value).toBe('Uložit změny');
    expect(firstSuggestion.phraseId).toBe('_e845123154101354564');
    expect(firstSuggestion.project.name).toBe('My App');

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/tm?to=cs`,
      { headers: jsonHeaders(), method: 'GET' },
    );
  });

  test('api.suggestions.mt', async (): Promise<void> => {
    const request: SuggestionsRequest = { project, key: KEY_ID, to: 'cs' };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: MtSuggestionsResponse = await api.suggestions.mt(request);

    expect(response.enabled).toBe(true);
    expect(response.allowedEngines).toEqual(['google', 'deepl']);
    const firstItem = assertNotNull(response.items[0]);
    expect(firstItem.suggestions.map((s): string => s.engine)).toEqual(['google', 'deepl']);

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/mt?to=cs`,
      { headers: jsonHeaders(), method: 'GET' },
    );
  });

  test('api.suggestions.mt surfaces soft errors without throwing', async (): Promise<void> => {
    const response: MtSuggestionsResponse = await api.suggestions.mt({
      project,
      key: KEY_ID,
      to: 'cs',
    });

    // A soft engine failure is reported in `errors`, never as a rejected promise.
    expect(response.errors).toEqual({ azure: 'Engine timed out.' });
    expect(response.enabled).toBe(true);
  });

  test('api.suggestions.mt accepts numeric language ids and sends `from`', async (): Promise<void> => {
    const request: SuggestionsRequest = { project, key: KEY_ID, to: 112, from: 85 };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: MtSuggestionsResponse = await api.suggestions.mt(request);

    // `enabled: false` is distinct from "ran but found nothing".
    expect(response.enabled).toBe(false);
    expect(response.items).toEqual([]);

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/mt?to=112&from=85`,
      { headers: jsonHeaders(), method: 'GET' },
    );
  });

  test('api.suggestions.ai posts the languages in the body', async (): Promise<void> => {
    const request: SuggestionsRequest = { project, key: KEY_ID, to: 'cs' };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: AiSuggestionsResponse = await api.suggestions.ai(request);

    expect(response.enabled).toBe(true);
    const firstItem = assertNotNull(response.items[0]);
    const firstSuggestion = assertNotNull(firstItem.suggestions[0]);
    expect(firstSuggestion.engine).toBe('localazyAi');

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/ai`,
      { body: '{"to":"cs"}', headers: jsonHeaders(), method: 'POST' },
    );
  });

  test('api.suggestions.ai sends `from` when provided', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.suggestions.ai({ project, key: KEY_ID, to: 'cs', from: 'en' });

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/ai`,
      { body: '{"to":"cs","from":"en"}', headers: jsonHeaders(), method: 'POST' },
    );
  });

  test('api.suggestions.ai omits `from` when not provided', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.suggestions.ai({ project, key: KEY_ID, to: 'cs' });

    // The body must carry `to` only — never `"from":"undefined"`.
    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/ai`,
      { body: '{"to":"cs"}', headers: jsonHeaders(), method: 'POST' },
    );
  });

  test('api.suggestions.ai omits a null `from` rather than sending "null"', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.suggestions.ai({
      project,
      key: KEY_ID,
      to: 'cs',
      from: null as unknown as undefined,
    });

    expect(spy).toHaveBeenCalledWith(
      `https://api.localazy.com/projects/_a0000000000000000001/keys/${KEY_ID}/suggestions/ai`,
      { body: '{"to":"cs"}', headers: jsonHeaders(), method: 'POST' },
    );
  });

  test('api.suggestions.mt preserves caller-supplied config.params', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.suggestions.mt({ project, key: KEY_ID, to: 'cs' }, { params: { extra: '1' } });

    // The caller's param must survive alongside the language params.
    const calledUrl: string = String(spy.mock.calls.at(-1)?.[0]);
    expect(calledUrl).toContain('extra=1');
    expect(calledUrl).toContain('to=cs');
  });

  test('api.suggestions.mt rejects a missing target language', async (): Promise<void> => {
    await expect(
      api.suggestions.mt({ project, key: KEY_ID, to: null as unknown as 'cs' }),
    ).rejects.toThrow('Invalid to language.');
  });

  test('api.suggestions.tm rejects an invalid key id', async (): Promise<void> => {
    await expect(api.suggestions.tm({ project, key: '', to: 'cs' })).rejects.toThrow(
      'Invalid key ID.',
    );
  });
});
