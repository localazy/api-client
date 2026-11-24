import { ApiBase } from '@/api/methods/api-base.js';
import type { Link } from '@/types/link.js';
import type { LinkCreateRequest } from '@/types/link-create-request.js';
import type { LinkDeleteRequest } from '@/types/link-delete-request.js';
import type { LinkListRequest } from '@/types/link-list-request.js';
import type { LinksPaginated } from '@/types/links-paginated.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiLinks extends ApiBase {
  /**
   * List all {@link Link  key links} in the project.
   *
   * @param request Link list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/duplicities#list-links  Localazy API Docs}
   */
  public async list(request: LinkListRequest, config?: RequestConfig): Promise<Link[]> {
    const links: Link[] = [];
    let next: string | undefined = request.next;

    do {
      const page: LinksPaginated = await this.listPage({ ...request, next }, config);
      links.push(...page.links);
      next = page.next;
    } while (next);

    return links;
  }

  /**
   * List {@link Link  key links} in the project. Result is paginated.
   *
   * @param request Link list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/duplicities#list-links  Localazy API Docs}
   */
  public async listPage(request: LinkListRequest, config?: RequestConfig): Promise<LinksPaginated> {
    const { project, limit, next }: LinkListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const params: Record<string, string> = { ...config?.params };

    if (limit !== undefined) {
      params.limit = String(limit);
    }
    if (next) {
      params.next = next;
    }

    return (await this.api.client.get(
      `/projects/${projectId}/links`,
      Object.keys(params).length > 0 ? { ...config, params } : config,
    )) as LinksPaginated;
  }

  /**
   * Link a {@link Key  key} to a target key, in the same project or another one. The linked key
   * becomes hidden and publishes the target's content while the link exists.
   *
   * Links are honoured during publishing only on the Business plan and above; on other plans they
   * are stored but ignored. A segmented key as a whole cannot be linked on either side (its
   * individual segments can), and a key or target that does not exist rejects with `unauthorized`.
   *
   * @param request Link create request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/duplicities#create-links  Localazy API Docs}
   */
  public async create(request: LinkCreateRequest, config?: RequestConfig): Promise<void> {
    const { project, key, linkedKey, linkedProject }: LinkCreateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');
    const data: { keyId: string; project?: string } = {
      keyId: ApiBase.getId(linkedKey, 'linked key'),
    };

    if (linkedProject !== undefined) {
      data.project = ApiBase.getId(linkedProject, 'linked project');
    }

    await this.api.client.post(`/projects/${projectId}/links/${keyId}`, data, config);
  }

  /**
   * Remove the link of a {@link Key  key}. A segmented key as a whole is rejected.
   *
   * @param request Link delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/duplicities#remove-links  Localazy API Docs}
   */
  public async delete(request: LinkDeleteRequest, config?: RequestConfig): Promise<void> {
    const { project, key }: LinkDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    await this.api.client.delete(`/projects/${projectId}/links/${keyId}`, config);
  }
}
