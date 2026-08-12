import type {
  ApiClient,
  File,
  Key,
  KeyDeleteRequest,
  KeySetPriorityRequest,
  KeySetTagsRequest,
  KeySubmitTranslationRequest,
  KeyUpdateRequest,
  Project,
  SubmitTranslationResponse,
  BooleanResult,
} from '@/main.js';
import { Locales, plural } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Keys', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.keys.update', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const firstKey = assertNotNull(keys[0]);
    const request: KeyUpdateRequest = {
      project,
      key: firstKey,
      comment: 'Comment for translators.',
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.update(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001',
      {
        body: '{"comment":"Comment for translators."}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.keys.delete', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const firstKey = assertNotNull(keys[0]);
    const request: KeyDeleteRequest = { project, key: firstKey };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.delete(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001',
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

  test('api.keys.submitTranslation', async (): Promise<void> => {
    const request: KeySubmitTranslationRequest = {
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      value: 'Uložit změny',
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: SubmitTranslationResponse = await api.keys.submitTranslation(request);

    expect(response.result).toBe(true);
    expect(response.versionId).toBe('_v000000000000000001');
    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/cs',
      {
        body: '{"value":"Uložit změny"}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  });

  test('api.keys.submitTranslation with a plural value', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.submitTranslation({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      value: { one: '1 položka', few: '%d položky', other: '%d položek' },
    });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/cs',
      expect.objectContaining({
        body: '{"value":{"one":"1 položka","few":"%d položky","other":"%d položek"}}',
        method: 'POST',
      }),
    );
  });

  test('api.keys.setTags', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const firstKey = assertNotNull(keys[0]);
    const request: KeySetTagsRequest = {
      project,
      keys: [firstKey],
      addTags: ['ui'],
      removeTags: ['legacy'],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: BooleanResult = await api.keys.setTags(request);

    expect(response.result).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/tags',
      {
        body: '{"keys":["_a0000000000000000001"],"addTags":["ui"],"removeTags":["legacy"]}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.keys.setTags accepts plain key ids', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.setTags({
      project,
      keys: ['_a0000000000000000001', '_a0000000000000000002'],
      addTags: ['ui'],
    });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/tags',
      expect.objectContaining({
        body: '{"keys":["_a0000000000000000001","_a0000000000000000002"],"addTags":["ui"]}',
        method: 'PUT',
      }),
    );
  });

  test('api.keys.setPriority', async (): Promise<void> => {
    const request: KeySetPriorityRequest = {
      project,
      keys: ['_a0000000000000000001'],
      priority: 'high',
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: BooleanResult = await api.keys.setPriority(request);

    expect(response.result).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/priority',
      {
        body: '{"keys":["_a0000000000000000001"],"priority":"high"}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.keys.setPriority rejects an invalid key id', async (): Promise<void> => {
    await expect(api.keys.setPriority({ project, keys: [''], priority: 'normal' })).rejects.toThrow(
      'Invalid key ID.',
    );
  });
  test('api.keys.submitTranslation escapes a script-qualified locale', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.submitTranslation({
      project,
      key: '_a0000000000000000001',
      lang: 'zh#Hans',
      value: '保存',
    });

    // `#` must be percent-encoded, otherwise fetch treats the rest as a URL
    // fragment and the backend silently receives the truncated locale `zh`.
    const calledUrl: string = String(spy.mock.calls.at(-1)?.[0]);
    expect(calledUrl).toContain('/translations/zh%23Hans');
    expect(new URL(calledUrl).pathname).toMatch(/\/translations\/zh%23Hans$/u);
  });

  test('api.keys.submitTranslation strips the read-side @ plural prefix', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    // Exactly the shape files.listKeys() returns for a plural key.
    await api.keys.submitTranslation({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      value: { '@one': '1 položka', '@few': '%d položky', '@other': '%d položek' },
    });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/cs',
      expect.objectContaining({
        body: '{"value":{"one":"1 položka","few":"%d položky","other":"%d položek"}}',
        method: 'POST',
      }),
    );
  });

  test('api.keys.submitTranslation rejects a missing language', async (): Promise<void> => {
    await expect(
      api.keys.submitTranslation({
        project,
        key: '_a0000000000000000001',
        lang: null as unknown as 'cs',
        value: 'x',
      }),
    ).rejects.toThrow('Invalid lang language.');
  });

  test('api.keys.setTags accepts a mixed array of key objects and ids', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    const firstKey = assertNotNull(keys[0]);
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');

    // Mixed arrays must compile as well as run.
    await api.keys.setTags({
      project,
      keys: [firstKey, '_a0000000000000000002'],
      addTags: ['ui'],
    });

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/tags',
      expect.objectContaining({
        body: '{"keys":["_a0000000000000000001","_a0000000000000000002"],"addTags":["ui"]}',
        method: 'PUT',
      }),
    );
  });

  test('api.keys.setTags rejects a non-array keys value', async (): Promise<void> => {
    await expect(
      api.keys.setTags({
        project,
        keys: '_a0000000000000000001' as unknown as string[],
        addTags: ['ui'],
      }),
    ).rejects.toThrow('Invalid key list: an array is required.');
  });
  test('api.keys.submitTranslation accepts a plural() marker', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.keys.submitTranslation({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      value: plural({ one: '1 položka', few: '%d položky', other: '%d položek' }),
    });

    // The marker is unwrapped to plain CLDR classes — no wrapper leaks to the wire.
    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001/translations/cs',
      expect.objectContaining({
        body: '{"value":{"one":"1 položka","few":"%d položky","other":"%d položek"}}',
        method: 'POST',
      }),
    );
  });
});
