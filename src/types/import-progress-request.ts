import type { Project } from '@/types/project';

export type ImportProgressRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Import session identifier.
   */
  importBatch: string;
};
