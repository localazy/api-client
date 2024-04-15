import { AxiosRequestConfig } from 'axios';
import { ApiBase } from '@/api/methods/api-base';
import { Project } from '@/types/project';
import { ProjectsListRequest } from '@/types/projects-list-request';

export class ApiProjects extends ApiBase {
  /**
   * List all {@link Project  projects}.
   *
   * @param request Projects list request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/projects#list-projects  Localazy API Docs}
   */
  public async list(request?: ProjectsListRequest, config?: AxiosRequestConfig): Promise<Project[]> {
    return this.api.client.get('/projects', { ...config, params: request });
  }

  /**
   * First {@link Project  project}.
   *
   * @param request Projects list request config.
   * @param config Axios request config.
   * @throws Error At least one project must exist, otherwise an error is thrown.
   *
   * @see {@link https://localazy.com/docs/api/projects#list-projects  Localazy API Docs}
   */
  public async first(request?: ProjectsListRequest, config?: AxiosRequestConfig): Promise<Project> {
    const projects: Project[] = await this.list(request, config);

    if (projects.length === 0) {
      throw new Error('Project not found.');
    }

    return projects[0];
  }
}
