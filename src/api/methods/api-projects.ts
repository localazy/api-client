import { ApiBase } from '@/api/methods/api-base';
import type { Project } from '@/types/project';
import type { ProjectsListRequest } from '@/types/projects-list-request';
import type { RequestConfig } from '@/types/request-config';

export class ApiProjects extends ApiBase {
  /**
   * List all {@link Project  projects}.
   *
   * @param request Projects list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/projects#list-projects  Localazy API Docs}
   */
  public async list(request?: ProjectsListRequest, config?: RequestConfig): Promise<Project[]> {
    return (await this.api.client.get('/projects', { ...config, params: request })) as Project[];
  }

  /**
   * First {@link Project  project}.
   *
   * @param request Projects list request config.
   * @param config Request config.
   * @throws Error At least one project must exist, otherwise an error is thrown.
   *
   * @see {@link https://localazy.com/docs/api/projects#list-projects  Localazy API Docs}
   */
  public async first(request?: ProjectsListRequest, config?: RequestConfig): Promise<Project> {
    const projects: Project[] = await this.list(request, config);

    if (typeof projects[0] !== 'undefined') {
      return projects[0];
    }

    throw new Error('Project not found.');
  }
}
