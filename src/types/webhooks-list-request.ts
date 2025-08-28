import type { Project } from '@/types/project.js';

export type WebhooksListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
