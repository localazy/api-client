import { AxiosRequestConfig, AxiosResponseTransformer } from 'axios';
import { ApiBase } from '~/api/methods/api-base';
import { GlossaryCreateRequest } from '~/types/glossary-create-request';
import { GlossaryDeleteRequest } from '~/types/glossary-delete-request';
import { GlossaryFindRequest } from '~/types/glossary-find-request';
import { GlossaryListRequest } from '~/types/glossary-list-request';
import { GlossaryRecord } from '~/types/glossary-record';
import { GlossaryUpdateRequest } from '~/types/glossary-update-request';

export class ApiGlossary extends ApiBase {
  /**
   * List all {@link GlossaryRecord  glossary records} in the project.
   *
   * @param request Glossary records list request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#list-all-glossary-terms  Localazy API Docs}
   */
  public async list(request: GlossaryListRequest, config?: AxiosRequestConfig): Promise<GlossaryRecord[]> {
    const { project }: GlossaryListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const transformResponse: AxiosResponseTransformer = (data: string): GlossaryRecord[] => {
      const json: { glossaries: GlossaryRecord[] } = JSON.parse(data);
      return json.glossaries;
    };

    return this.api.client.get(`/projects/${projectId}/glossary`, { transformResponse, ...config });
  }

  /**
   * Find {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record find request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#get-glossary-term  Localazy API Docs}
   */
  public async find(request: GlossaryFindRequest, config?: AxiosRequestConfig): Promise<GlossaryRecord> {
    const { project, glossaryRecord }: GlossaryFindRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    return this.api.client.get(`/projects/${projectId}/glossary/${id}`, config);
  }

  /**
   * Create {@link GlossaryRecord  glossary record}.
   * There is a limit of 1000 glossary records per project.
   *
   * @param request Glossary record create request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#create-new-glossary-term  Localazy API Docs}
   */
  public async create(request: GlossaryCreateRequest, config?: AxiosRequestConfig): Promise<string> {
    const { project, ...data }: GlossaryCreateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const transformResponse: AxiosResponseTransformer = (d: string): string => {
      const json: { result: string } = JSON.parse(d);
      return json.result;
    };

    return this.api.client.post(`/projects/${projectId}/glossary`, data, { transformResponse, ...config });
  }

  /**
   * Update {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record update request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#update-glossary-term  Localazy API Docs}
   */
  public async update(request: GlossaryUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, glossaryRecord, ...data }: GlossaryUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    await this.api.client.put(`/projects/${projectId}/glossary/${id}`, data, config);
  }

  /**
   * Delete {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record delete request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#delete-glossary-term  Localazy API Docs}
   */
  public async delete(request: GlossaryDeleteRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, glossaryRecord }: GlossaryDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    await this.api.client.delete(`/projects/${projectId}/glossary/${id}`, config);
  }
}
