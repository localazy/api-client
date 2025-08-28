import type { Project } from '@/types/project.js';
import type { Screenshot } from '@/types/screenshot.js';

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
