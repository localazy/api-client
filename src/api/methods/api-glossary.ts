import { ApiBase } from '@/api/methods/api-base';
import type { GlossaryCreateRequest } from '@/types/glossary-create-request';
import type { GlossaryDeleteRequest } from '@/types/glossary-delete-request';
import type { GlossaryFindRequest } from '@/types/glossary-find-request';
import type { GlossaryListRequest } from '@/types/glossary-list-request';
import type { GlossaryRecord } from '@/types/glossary-record';
import type { GlossaryUpdateRequest } from '@/types/glossary-update-request';
import type { RequestConfig } from '@/types/request-config';

export class ApiGlossary extends ApiBase {
  /**
   * List all {@link GlossaryRecord  glossary records} in the project.
   *
   * @param request Glossary records list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#list-all-glossary-terms  Localazy API Docs}
   */
  public async list(
    request: GlossaryListRequest,
    config?: RequestConfig,
  ): Promise<GlossaryRecord[]> {
    const { project }: GlossaryListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { glossaries: GlossaryRecord[] } = (await this.api.client.get(
      `/projects/${projectId}/glossary`,
      config,
    )) as { glossaries: GlossaryRecord[] };

    return response.glossaries;
  }

  /**
   * Find {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record find request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#get-glossary-term  Localazy API Docs}
   */
  public async find(request: GlossaryFindRequest, config?: RequestConfig): Promise<GlossaryRecord> {
    const { project, glossaryRecord }: GlossaryFindRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    return (await this.api.client.get(
      `/projects/${projectId}/glossary/${id}`,
      config,
    )) as GlossaryRecord;
  }

  /**
   * Create {@link GlossaryRecord  glossary record}.
   * There is a limit of 1000 glossary records per project.
   *
   * @param request Glossary record create request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#create-new-glossary-term  Localazy API Docs}
   */
  public async create(request: GlossaryCreateRequest, config?: RequestConfig): Promise<string> {
    const { project, ...data }: GlossaryCreateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { result: string } = (await this.api.client.post(
      `/projects/${projectId}/glossary`,
      data,
      config,
    )) as { result: string };

    return response.result;
  }

  /**
   * Update {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record update request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#update-glossary-term  Localazy API Docs}
   */
  public async update(request: GlossaryUpdateRequest, config?: RequestConfig): Promise<void> {
    const { project, glossaryRecord, ...data }: GlossaryUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    await this.api.client.put(`/projects/${projectId}/glossary/${id}`, data, config);
  }

  /**
   * Delete {@link GlossaryRecord  glossary record} specified by `id`.
   *
   * @param request Glossary record delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/glossary#delete-glossary-term  Localazy API Docs}
   */
  public async delete(request: GlossaryDeleteRequest, config?: RequestConfig): Promise<void> {
    const { project, glossaryRecord }: GlossaryDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const id: string = typeof glossaryRecord === 'string' ? glossaryRecord : glossaryRecord.id;

    await this.api.client.delete(`/projects/${projectId}/glossary/${id}`, config);
  }
}
