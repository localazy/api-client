import type { Project } from '@/types/project';
import type { Screenshot } from '@/types/screenshot';

export type ScreenshotDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Screenshot object or Screenshot ID.
   */
  screenshot: Screenshot | string;
};
