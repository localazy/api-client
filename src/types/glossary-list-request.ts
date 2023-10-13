import { Project } from '~/types/project';

export type GlossaryListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
