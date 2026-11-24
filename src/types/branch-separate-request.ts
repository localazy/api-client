import type { Branch } from '@/types/branch.js';
import type { Project } from '@/types/project.js';

export type BranchSeparateRequest = {
  /**
   * Project object or Project ID of any branch of the project.
   */
  project: Project | string;

  /**
   * Branch to turn into an independent project, by name or as a Branch object.
   */
  branch: Branch | Pick<Branch, 'name'> | string;
};
