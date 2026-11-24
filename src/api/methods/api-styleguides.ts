import { ApiBase } from '@/api/methods/api-base.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { Styleguides } from '@/types/styleguides.js';
import type { StyleguidesListRequest } from '@/types/styleguides-list-request.js';

export class ApiStyleguides extends ApiBase {
  /**
   * Get the project's style guides: the general one and one per language. Empty or blank style
   * guides count as not set. This API cannot change them.
   *
   * @param request Styleguides list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-styleguides-plurals#get-style-guides
   * | Localazy API Docs}
   */
  public async list(request: StyleguidesListRequest, config?: RequestConfig): Promise<Styleguides> {
    const projectId: string = ApiBase.getId(request.project, 'project');

    return (await this.api.client.get(`/projects/${projectId}/styleguides`, config)) as Styleguides;
  }
}
