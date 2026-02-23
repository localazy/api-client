import { ApiBase } from '@/api/methods/api-base.js';
import type { AiTranslateRequest } from '@/types/ai-translate-request.js';
import type { AiTranslateResponse } from '@/types/ai-translate-response.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiAi extends ApiBase {
  /**
   * Translate provided items from the source language to the target language
   * using Localazy AI and considering the provided context, project-defined
   * style guide and glossary.
   *
   * @param request AI translate request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/ai-translation#translate  Localazy API Docs}
   */
  public async translate(
    request: AiTranslateRequest,
    config?: RequestConfig,
  ): Promise<AiTranslateResponse> {
    const { project, ...data }: AiTranslateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.post(
      `/projects/${projectId}/ai`,
      data,
      config,
    )) as AiTranslateResponse;
  }
}
