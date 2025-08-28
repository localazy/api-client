import type { Project } from '@/types/project';
import type { Webhook } from '@/types/webhook';

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
