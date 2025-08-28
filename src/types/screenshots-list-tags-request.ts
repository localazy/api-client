import type { Project } from '@/types/project.js';

export type ScreenshotsListTagsRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
