import type {
  ApiClient,
  File,
  FileGetContentsRequest,
  FileListKeysRequest,
  Key,
  KeysPaginated,
  Project,
} from '@/main.js';
import { Locales } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient, getApiUrl, getToken } from '@tests/support/index.js';
import type { Blob } from 'node:buffer';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Files', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.files.list', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const files: File[] = await api.files.list({ project });

    const firstFile = assertNotNull(files[0]);
    expect(firstFile.name).toBe('en.json');
    expect(firstFile.type).toBe('json');
    expect(spy).toHaveBeenCalledWith(`${getApiUrl()}/projects/_a0000000000000000001/files`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  test('api.files.first', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const file: File = await api.files.first({ project });

    expect(file.name).toBe('en.json');
    expect(file.type).toBe('json');
    expect(spy).toHaveBeenCalledWith(`${getApiUrl()}/projects/_a0000000000000000001/files`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  test('api.files.listKeys', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: FileListKeysRequest = { project, file, lang: Locales.ENGLISH };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const keys: Key[] = await api.files.listKeys(request);

    const firstKey = assertNotNull(keys[0]);
    expect(firstKey.value).toBe('My Application');
    expect(spy).toHaveBeenCalledWith(
      `${getApiUrl()}/projects/_a0000000000000000001/files/_e000000000001/keys/en?next=`,
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

  test('api.files.listKeysPage', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: FileListKeysRequest = {
      project,
      file,
      lang: Locales.ENGLISH,
    };
    const keys: Key[] = [];

    let pageResult: KeysPaginated = {
      keys: [],
      next: '',
    };

    do {
      pageResult = await api.files.listKeysPage({ ...request, next: pageResult.next });
      keys.push(...pageResult.keys);
    } while (pageResult.next);

    expect(keys.length).toBe(7);
  });

  test('api.files.getContents', async (): Promise<void> => {
    // const files: File[] = await api.files.list({ project });
    const file: File = await api.files.first({ project });
    const request: FileGetContentsRequest = { project, file, lang: Locales.ENGLISH };
    const blob: Blob = await api.files.getContents(request);
    const content: string = await blob.text();

    expect(content).toStrictEqual(fullProject.serverResponses.fileDownload);
  });
});
