import { AxiosRequestConfig } from 'axios';
import { Blob } from 'node:buffer';
import { ApiBase } from '@/api/methods/api-base';
import { File } from '@/types/file';
import { FileGetContentsRequest } from '@/types/file-get-contents-request';
import { FileListKeysRequest } from '@/types/file-list-keys-request';
import { FilesListRequest } from '@/types/files-list-request';
import { Key } from '@/types/key';
import { KeysPaginated } from '@/types/keys-paginated';

export class ApiFiles extends ApiBase {
  /**
   * List all {@link File  files} in the project.
   *
   * @param request Files list request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-files-in-project  Localazy API Docs}
   */
  public async list(request: FilesListRequest, config?: AxiosRequestConfig): Promise<File[]> {
    const { project }: FilesListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return this.api.client.get(`/projects/${projectId}/files`, config);
  }

  /**
   * First {@link File  file} in the project.
   *
   * @param request Files list request config.
   * @param config Axios request config.
   * @throws Error At least one file must exist, otherwise an error is thrown.
   *
   * @see {@link https://localazy.com/docs/api/files#list-files-in-project  Localazy API Docs}
   */
  public async first(request: FilesListRequest, config?: AxiosRequestConfig): Promise<File> {
    const files: File[] = await this.list(request, config);

    if (files.length === 0) {
      throw new Error('File not found.');
    }

    return files[0];
  }

  /**
   * List all {@link Key  keys} for the language in the {@link File  file}.
   *
   * @param request File list keys request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file
   * | Localazy API Docs}
   */
  public async listKeys(request: FileListKeysRequest, config?: AxiosRequestConfig): Promise<Key[]> {
    const keys: Key[] = [];
    let pageResult: KeysPaginated = {
      keys: [],
      next: '',
    };

    do {
      // eslint-disable-next-line no-await-in-loop
      pageResult = await this.listKeysPage({ ...request, next: pageResult.next }, config);
      keys.push(...pageResult.keys);
    } while (pageResult.next);

    return keys;
  }

  /**
   * List all {@link Key  keys} for the language in the {@link File  file}. Result is paginated.
   *
   * @param request File list keys request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file
   * | Localazy API Docs}
   */
  public async listKeysPage(request: FileListKeysRequest, config?: AxiosRequestConfig): Promise<KeysPaginated> {
    const { project, file, lang, ...params }: FileListKeysRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const fileId: string = ApiBase.getId(file, 'file');

    return this.api.client.get(`/projects/${projectId}/files/${fileId}/keys/${lang}`, { ...config, params });
  }

  /**
   * Get the contents of the {@link File  file}.
   *
   * @param request File get contents request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-file-content  Localazy API Docs}
   */
  public async getContents(request: FileGetContentsRequest, config?: AxiosRequestConfig): Promise<Blob> {
    const { project, file, lang }: FileGetContentsRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const fileId: string = ApiBase.getId(file, 'file');

    const buffer: Uint8Array = await this.api.client.get(`/projects/${projectId}/files/${fileId}/download/${lang}`, {
      ...config,
      responseType: 'arraybuffer',
    });

    return new Blob([buffer]);
  }
}
