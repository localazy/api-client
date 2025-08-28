import type { Project } from '@/types/project';

export type ScreenshotsListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;
};
