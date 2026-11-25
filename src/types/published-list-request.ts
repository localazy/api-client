import type { Project } from '@/types/project.js';

export type PublishedListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
