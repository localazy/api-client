import { ApiBase } from '@/api/methods/api-base.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { Webhook } from '@/types/webhook.js';
import type { WebhooksGetSecretRequest } from '@/types/webhooks-get-secret-request.js';
import type { WebhooksListRequest } from '@/types/webhooks-list-request.js';
import type { WebhooksSecret } from '@/types/webhooks-secret.js';
import type { WebhooksUpdateRequest } from '@/types/webhooks-update-request.js';

export class ApiWebhooks extends ApiBase {
  /**
   * List all {@link Webhook webhooks} in the project.
   *
   * @param request Webhooks list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#list-webhooks-configuration  Localazy API Docs}
   */
  public async list(request: WebhooksListRequest, config?: RequestConfig): Promise<Webhook[]> {
    const { project }: WebhooksListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { items: Webhook[] } = (await this.api.client.get(
      `/projects/${projectId}/webhooks`,
      config,
    )) as {
      items: Webhook[];
    };

    return response.items;
  }

  /**
   * Update all {@link Webhook  webhooks} in the project.
   *
   * @param request Webhooks update request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#update-webhooks-configuration  Localazy API Docs}
   */
  public async update(request: WebhooksUpdateRequest, config?: RequestConfig): Promise<void> {
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
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/webhooks-api#webhook-secrets  Localazy API Docs}
   */
  public async getSecret(
    request: WebhooksGetSecretRequest,
    config?: RequestConfig,
  ): Promise<WebhooksSecret> {
    const { project }: WebhooksGetSecretRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { secret: string } = (await this.api.client.get(
      `/projects/${projectId}/webhooks/secret`,
      config,
    )) as { secret: string };

    return response.secret;
  }
}
