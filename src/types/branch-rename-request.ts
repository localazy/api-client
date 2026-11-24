import type { Branch } from '@/types/branch.js';
import type { Project } from '@/types/project.js';

export type BranchRenameRequest = {
  /**
   * Project object or Project ID of any branch of the project.
   */
  project: Project | string;

  /**
   * Branch to rename, by name or as a Branch object. The main branch cannot be renamed.
   */
  branch: Branch | Pick<Branch, 'name'> | string;

  /**
   * New name, with the same rules as the name of a new branch.
   */
  name: string;
};
