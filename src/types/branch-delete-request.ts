import type { Branch } from '@/types/branch.js';
import type { Project } from '@/types/project.js';

export type BranchDeleteRequest = {
  /**
   * Project object or Project ID of any branch of the project, including the one being deleted.
   */
  project: Project | string;

  /**
   * Branch to delete, by name or as a Branch object.
   */
  branch: Branch | Pick<Branch, 'name'> | string;
};
