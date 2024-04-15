import { beforeEach, describe, expect, test } from 'vitest';
import { Blob } from 'node:buffer';
import { getApiClient } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import {
  ApiClient,
  File,
  FileGetContentsRequest,
  FileListKeysRequest,
  Key,
  KeysPaginated,
  Locales,
  Project,
} from '@/main';

describe('Files', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.files.list', async (): Promise<void> => {
    const files: File[] = await api.files.list({ project });

    expect(files[0].name).toBe('en.json');
    expect(files[0].type).toBe('json');
  });

  test('api.files.first', async (): Promise<void> => {
    const file: File = await api.files.first({ project });

    expect(file.name).toBe('en.json');
    expect(file.type).toBe('json');
  });

  test('api.files.listKeys', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: FileListKeysRequest = { project, file, lang: Locales.ENGLISH };
    const keys: Key[] = await api.files.listKeys(request);

    expect(keys[0].value).toBe('My Application');
  });

  test('api.files.listKeysPage', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: FileListKeysRequest = {
      project,
      file,
      lang: Locales.ENGLISH,
      limit: 1,
    };
    const keys: Key[] = [];

    let pageResult: KeysPaginated = {
      keys: [],
      next: '',
    };

    do {
      // eslint-disable-next-line no-await-in-loop
      pageResult = await api.files.listKeysPage({ ...request, next: pageResult.next });
      keys.push(...pageResult.keys);
    } while (pageResult.next);

    expect(keys.length).toBe(7);
  });

  test('api.files.getContents', async (): Promise<void> => {
    const file: File = await api.files.first({ project });
    const request: FileGetContentsRequest = { project, file, lang: Locales.ENGLISH };
    const blob: Blob = await api.files.getContents(request);
    const content: string = await blob.text();

    expect(content).toStrictEqual(fullProject.serverResponses.fileDownload);
  });
});
