import type { Project } from '@/types/project.js';

export type BranchListRequest = {
  /**
   * Project object or Project ID of the main branch or of any other branch.
   */
  project: Project | string;
};
