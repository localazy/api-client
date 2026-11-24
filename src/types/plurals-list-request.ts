import type { Project } from '@/types/project.js';

export type PluralsListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
