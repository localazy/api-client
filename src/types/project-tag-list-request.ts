import type { Project } from '@/types/project.js';

export type ProjectTagListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
