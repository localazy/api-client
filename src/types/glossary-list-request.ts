import type { Project } from '@/types/project.js';

export type GlossaryListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
