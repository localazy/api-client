import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient, mockAdapter } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, Project, Webhook, WebhooksSecret, WebhooksUpdateRequest } from '@/main';

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
    await api.webhooks.update(request);

    expect(mockAdapter.history.post.length).toBe(1);
    expect(mockAdapter.history.post[0].data).toMatchSnapshot();
  });

  test('api.webhooks.getSecret', async (): Promise<void> => {
    const secret: WebhooksSecret = await api.webhooks.getSecret({ project });

    expect(secret).toBe(fullProject.serverResponses.webhooksSecret.secret);
  });
});
