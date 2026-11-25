import type { Project } from '@/types/project.js';

export type StyleguidesListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
