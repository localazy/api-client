import type { Project } from '@/types/project.js';

export type FilesListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
