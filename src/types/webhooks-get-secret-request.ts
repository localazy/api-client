import type { Project } from '@/types/project.js';

export type WebhooksGetSecretRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
