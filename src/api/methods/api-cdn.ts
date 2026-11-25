import { ApiBase } from '@/api/methods/api-base.js';
import type { CdnListRequest } from '@/types/cdn-list-request.js';
import type { CdnMetadata } from '@/types/cdn-metadata.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiCdn extends ApiBase {
  /**
   * List the CDN metadata file URLs of `latest` and of each published release tag. When the CDN is
   * disabled for the project, `enabled` is `false` and the list is empty.
   *
   * @param request CDN list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/cdn#list-metadata-files  Localazy API Docs}
   */
  public async list(request: CdnListRequest, config?: RequestConfig): Promise<CdnMetadata> {
    const projectId: string = ApiBase.getId(request.project, 'project');

    return (await this.api.client.get(`/projects/${projectId}/cdn`, config)) as CdnMetadata;
  }
}
