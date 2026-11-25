import { ApiBase } from '@/api/methods/api-base.js';
import type { ProjectTag } from '@/types/project-tag.js';
import type { ProjectTagListRequest } from '@/types/project-tag-list-request.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiTags extends ApiBase {
  /**
   * List all {@link ProjectTag  tags} that keys of the project can have: the built-in tags first,
   * then the project's own. Not paginated. Screenshot tags are separate, see `screenshots.listTags()`.
   *
   * @param request Project tag list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#list-tags-of-a-project  Localazy API Docs}
   */
  public async list(request: ProjectTagListRequest, config?: RequestConfig): Promise<ProjectTag[]> {
    const { project }: ProjectTagListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.get(`/projects/${projectId}/tags`, config)) as ProjectTag[];
  }
}
