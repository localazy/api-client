import { Project } from '~/types/project';

export type FilesListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
