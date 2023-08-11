import { Project } from '~/types/project';

export type WebhooksGetSecretRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
