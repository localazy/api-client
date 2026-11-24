import type { Branch } from '@/types/branch.js';
import type { Project } from '@/types/project.js';

export type BranchSetMainRequest = {
  /**
   * Project object or Project ID of any branch of the project.
   */
  project: Project | string;

  /**
   * Branch that becomes `main`, by name or as a Branch object.
   */
  branch: Branch | Pick<Branch, 'name'> | string;

  /**
   * New name of the branch that is `main` now, with the same rules as the name of a new branch.
   */
  name: string;
};
