import type { Project } from '@/types/project.js';

export type BranchGetOperationRequest = {
  /**
   * Project object or Project ID of any branch of the project that started the operation.
   */
  project: Project | string;

  /**
   * Operation ID returned by `branches.create()` or `branches.merge()`.
   */
  operation: string;
};
