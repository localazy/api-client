import { AxiosRequestConfig, AxiosResponseTransformer } from 'axios';
import { ApiBase } from '~/api/methods/api-base';
import { Webhook } from '~/types/webhook';
import { WebhooksGetSecretRequest } from '~/types/webhooks-get-secret-request';
import { WebhooksListRequest } from '~/types/webhooks-list-request';
import { WebhooksSecret } from '~/types/webhooks-secret';
import { WebhooksUpdateRequest } from '~/types/webhooks-update-request';

export class ApiWebhooks extends ApiBase {
  /**
   * List all {@link Webhook webhooks} in the project.
   *
   * @param request Webhooks list request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#list-webhooks-configuration  Localazy API Docs}
   */
  public async list(request: WebhooksListRequest, config?: AxiosRequestConfig): Promise<Webhook[]> {
    const { project }: WebhooksListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const transformResponse: AxiosResponseTransformer = (data: string): Webhook[] => {
      const json: { items: Webhook[] } = JSON.parse(data);
      return json.items;
    };

    return this.api.client.get(`/projects/${projectId}/webhooks`, { transformResponse, ...config });
  }

  /**
   * Update all {@link Webhook  webhooks} in the project.
   *
   * @param request Webhooks update request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#update-webhooks-configuration  Localazy API Docs}
   */
  public async update(request: WebhooksUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, ...data }: WebhooksUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    await this.api.client.post(`/projects/${projectId}/webhooks`, data, config);
  }

  /**
   * Get secret for {@link Webhook  webhooks} in the project.
   * Localazy signs the webhook events it sends to your endpoints and adds a signature in the request header
   * {@link https://localazy.com/docs/api/webhooks-api#security}.
   *
   * @param request Webhooks get secret request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#webhook-secrets  Localazy API Docs}
   */
  public async getSecret(request: WebhooksGetSecretRequest, config?: AxiosRequestConfig): Promise<WebhooksSecret> {
    const { project }: WebhooksGetSecretRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const transformResponse: AxiosResponseTransformer = (data: string): WebhooksSecret => {
      const json: { secret: WebhooksSecret } = JSON.parse(data);
      return json.secret;
    };

    return this.api.client.get(`/projects/${projectId}/webhooks/secret`, { transformResponse, ...config });
  }
}
