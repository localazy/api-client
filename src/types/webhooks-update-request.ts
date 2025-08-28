import type { Project } from '@/types/project.js';
import type { Webhook } from '@/types/webhook.js';

export type WebhooksUpdateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * An array of Webhooks.
   */
  items: Webhook[];
};
