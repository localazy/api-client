import { ApiBase } from '@/api/methods/api-base';
import type { KeyDeleteRequest } from '@/types/key-delete-request';
import type { KeyDeprecateRequest } from '@/types/key-deprecate-request';
import type { KeyUpdateRequest } from '@/types/key-update-request';
import type { RequestConfig } from '@/types/request-config';

export class ApiKeys extends ApiBase {
  /**
   * Update {@link Key  key}.
   *
   * @param request Key update request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#update-source-key  Localazy API Docs}
   */
  public async update(request: KeyUpdateRequest, config?: RequestConfig): Promise<void> {
    const { project, key, ...data }: KeyUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    await this.api.client.put(`/projects/${projectId}/keys/${keyId}`, data, config);
  }

  /**
   * Delete {@link Key  key}.
   *
   * @param request Key delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#delete-source-key  Localazy API Docs}
   */
  public async delete(request: KeyDeleteRequest, config?: RequestConfig): Promise<void> {
    const { project, key }: KeyDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    await this.api.client.delete(`/projects/${projectId}/keys/${keyId}`, config);
  }

  /**
   * Deprecate keys.
   *
   * @param request Key deprecate request config.
   * @param config Request config.
   */
  public async deprecate(request: KeyDeprecateRequest, config?: RequestConfig): Promise<void> {
    const { project, phrases }: KeyDeprecateRequest = request;

    const localPhrases: string[] = phrases.map((phrase) => {
      if (typeof phrase === 'object' && 'id' in phrase) {
        return phrase.id;
      }

      if (typeof phrase === 'string') {
        return phrase;
      }

      return phrase;
    });
    const projectId: string = ApiBase.getId(project, 'project');

    await this.api.client.post(
      `/projects/${projectId}/keys/deprecate`,
      { phrases: localPhrases },
      config,
    );
  }
}
