import type { Project } from '@/types/project.js';

export type ScreenshotsListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
