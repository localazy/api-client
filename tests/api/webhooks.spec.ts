import { Webhook, WebhooksSecret } from '~/main';

describe('Webhooks', (): void => {
  test('api.webhooks.list', async (): Promise<void> => {
    // prepare
    const items: Webhook[] = [
      {
        enabled: true,
        customId: '1',
        description: 'This is a test webhook',
        url: 'https://example.com/webhook',
        events: [
          'comment_added',
          'import_finished',
          'import_finished_empty',
          'project_published',
          'tag_promoted',
        ],
      },
    ];
    await api.webhooks.update({ project, items });

    // test
    const webhooks: Webhook[] = await api.webhooks.list({ project });

    // verify
    expect(webhooks[0].description).toBe('This is a test webhook');

    // clean
    await api.webhooks.update({ project, items: [] });
  });

  test('api.webhooks.update', async (): Promise<void> => {
    // prepare
    const items: Webhook[] = [
      {
        enabled: true,
        customId: '1',
        description: 'This is a test webhook',
        url: 'https://example.com/webhook',
        events: [
          'comment_added',
          'import_finished',
          'import_finished_empty',
          'project_published',
          'tag_promoted',
        ],
      },
    ];
    await api.webhooks.update({ project, items });
    const updateItems: Webhook[] = [
      {
        enabled: true,
        customId: '2',
        description: 'This is an updated webhook',
        url: 'https://example.com/webhook2',
        events: [
          'comment_added',
          'import_finished',
          'import_finished_empty',
          'project_published',
          'tag_promoted',
        ],
      },
    ];

    // test
    await api.webhooks.update({ project, items: updateItems });

    // verify
    const webhooks: Webhook[] = await api.webhooks.list({ project });
    expect(webhooks[0].description).toBe('This is an updated webhook');

    // clean
    await api.webhooks.update({ project, items: [] });
  });

  test('api.webhooks.getSecret', async (): Promise<void> => {
    // test
    const secret: WebhooksSecret = await api.webhooks.getSecret({ project });

    // verify
    expect(secret.length).toBe(64);
  });
});
