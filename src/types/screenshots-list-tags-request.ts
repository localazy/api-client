import { Project } from '~/types/project';

export type ScreenshotsListTagsRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
