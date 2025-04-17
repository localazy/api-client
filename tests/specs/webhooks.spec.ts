import { ApiClient, Project, Webhook, WebhooksSecret, WebhooksUpdateRequest } from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient, getToken } from '@tests/support';
import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest';

describe('Webhooks', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.webhooks.list', async (): Promise<void> => {
    const webhooks: Webhook[] = await api.webhooks.list({ project });

    expect(webhooks[0].description).toBe('This is a test webhook');
  });

  test('api.webhooks.update', async (): Promise<void> => {
    const request: WebhooksUpdateRequest = {
      project,
      items: [
        {
          enabled: true,
          customId: '1',
          description: 'This is a test webhook',
          url: 'https://example.com/webhook',
          events: ['comment_added', 'import_finished', 'import_finished_empty', 'project_published', 'tag_promoted'],
        },
      ],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.webhooks.update(request);

    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/webhooks', {
      body: '{"items":[{"enabled":true,"customId":"1","description":"This is a test webhook","url":"https://example.com/webhook","events":["comment_added","import_finished","import_finished_empty","project_published","tag_promoted"]}]}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.webhooks.getSecret', async (): Promise<void> => {
    const secret: WebhooksSecret = await api.webhooks.getSecret({ project });

    expect(secret).toBe(fullProject.serverResponses.webhooksSecret.secret);
  });
});
