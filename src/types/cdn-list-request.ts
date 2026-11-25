import type { Project } from '@/types/project.js';

export type CdnListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
