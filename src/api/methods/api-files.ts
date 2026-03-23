import { ApiBase } from '@/api/methods/api-base.js';
import type { FileGetContentsRequest } from '@/types/file-get-contents-request.js';
import type { FileListKeysRequest } from '@/types/file-list-keys-request.js';
import type {
  FileListKeysSinceEventRequest,
  FileListKeysSinceEventResult,
} from '@/types/file-list-keys-since-event-request.js';
import type { File } from '@/types/file.js';
import type { FilesListRequest } from '@/types/files-list-request.js';
import type { Key } from '@/types/key.js';
import type { KeysPaginated } from '@/types/keys-paginated.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { Blob } from 'node:buffer';

export class ApiFiles extends ApiBase {
  /**
   * List all {@link File  files} in the project.
   *
   * @param request Files list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-files-in-project  Localazy API Docs}
   */
  public async list(request: FilesListRequest, config?: RequestConfig): Promise<File[]> {
    const { project }: FilesListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.get(`/projects/${projectId}/files`, config)) as Promise<File[]>;
  }

  /**
   * First {@link File  file} in the project.
   *
   * @param request Files list request config.
   * @param config Request config.
   * @throws Error At least one file must exist, otherwise an error is thrown.
   *
   * @see {@link https://localazy.com/docs/api/files#list-files-in-project  Localazy API Docs}
   */
  public async first(request: FilesListRequest, config?: RequestConfig): Promise<File> {
    const files: File[] = await this.list(request, config);

    if (typeof files[0] !== 'undefined') {
      return files[0];
    }

    throw new Error('File not found.');
  }

  /**
   * List all {@link Key  keys} for the language in the {@link File  file}.
   *
   * @param request File list keys request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file
   * | Localazy API Docs}
   */
  public async listKeys(request: FileListKeysRequest, config?: RequestConfig): Promise<Key[]> {
    const keys: Key[] = [];
    let pageResult: KeysPaginated = {
      keys: [],
      next: '',
    };

    do {
      pageResult = await this.listKeysPage({ ...request, next: pageResult.next }, config);
      keys.push(...pageResult.keys);
    } while (pageResult.next);

    return keys;
  }

  /**
   * List all {@link Key  keys} for the language in the {@link File  file}. Result is paginated.
   *
   * @param request File list keys request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file
   * | Localazy API Docs}
   */
  public async listKeysPage(
    request: FileListKeysRequest,
    config?: RequestConfig,
  ): Promise<KeysPaginated> {
    const { project, file, lang, ...params }: FileListKeysRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const fileId: string = ApiBase.getId(file, 'file');

    return (await this.api.client.get(`/projects/${projectId}/files/${fileId}/keys/${lang}`, {
      ...config,
      params,
    })) as KeysPaginated;
  }

  /**
   * List {@link Key  keys} for the language in the {@link File  file} with event-based filtering.
   * Fetches all keys with `event=true`, computes the maximum event number, and optionally
   * filters to only keys changed since a given event cursor.
   *
   * This method is designed for incremental sync: pass `sinceEvent` from a previous sync
   * to receive only keys that have changed since then.
   *
   * @param request File list keys since event request config.
   * @param config Request config.
   * @returns An object containing the filtered keys and the maximum event number.
   */
  public async listKeysSinceEvent(
    request: FileListKeysSinceEventRequest,
    config?: RequestConfig,
  ): Promise<FileListKeysSinceEventResult> {
    const { sinceEvent, ...rest } = request;
    const allKeys: Key[] = await this.listKeys({ ...rest, event: true }, config);

    const maxEvent: number | null =
      allKeys.length > 0 ? allKeys.reduce((max, key) => Math.max(max, key.event ?? 0), 0) : null;

    const keys: Key[] =
      sinceEvent !== null && sinceEvent !== undefined
        ? allKeys.filter((key) => (key.event ?? 0) > sinceEvent)
        : allKeys;

    return { keys, maxEvent };
  }

  /**
   * Get the contents of the {@link File  file}.
   *
   * @param request File get contents request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-file-content  Localazy API Docs}
   */
  public async getContents(request: FileGetContentsRequest, config?: RequestConfig): Promise<Blob> {
    const { project, file, lang }: FileGetContentsRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const fileId: string = ApiBase.getId(file, 'file');

    return (await this.api.client.get(`/projects/${projectId}/files/${fileId}/download/${lang}`, {
      ...config,
      responseType: 'blob',
    })) as Blob;
  }
}
