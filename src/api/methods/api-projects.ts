import { ApiBase } from '@/api/methods/api-base.js';
import type { Project } from '@/types/project.js';
import type { ProjectCreateRequest } from '@/types/project-create-request.js';
import type { ProjectCreateResponse } from '@/types/project-create-response.js';
import type { ProjectsListRequest } from '@/types/projects-list-request.js';
import type { RequestConfig } from '@/types/request-config.js';

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

  /**
   * Create a {@link Project  project} in the organization of the token. Needs an organization token.
   *
   * Rejected when the organization already has 50 projects, or the name, description, source
   * language or slug is invalid; a slug already in use is rejected too.
   *
   * @param request Project create request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/projects#create-project  Localazy API Docs}
   */
  public async create(
    request: ProjectCreateRequest,
    config?: RequestConfig,
  ): Promise<ProjectCreateResponse> {
    const { sourceLanguage }: ProjectCreateRequest = request;
    const body =
      sourceLanguage === undefined
        ? request
        : { ...request, sourceLanguage: String(sourceLanguage) };

    return (await this.api.client.post('/projects', body, config)) as ProjectCreateResponse;
  }
}
