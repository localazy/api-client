import { Project } from '@/types/project';

export type WebhooksListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
