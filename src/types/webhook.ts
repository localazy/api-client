import { WebhookEvent } from '~/enums/webhook-event';

export type Webhook = {
  /**
   * Whether the webhook is enabled or disabled.
   */
  enabled: boolean;

  /**
   * Custom ID that is passed when the webhook is invoked. Empty by default.
   */
  customId?: string;

  /**
   * Description of the webhook. Empty by default.
   */
  description?: string;

  /**
   * URL which is invoked on the webhook event.
   */
  url: string;

  /**
   * The list of event types for which this webhook is invoked.
   */
  events: `${WebhookEvent}`[];
};
