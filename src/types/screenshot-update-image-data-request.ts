import type { Project } from '@/types/project';
import type { Screenshot } from '@/types/screenshot';

export type ScreenshotUpdateImageDataRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Screenshot object or Screenshot ID.
   */
  screenshot: Screenshot | string;

  /**
   * Image in data format with base64 encoding: `data:image/jpeg;base64...`.
   * JPEG or PNG images are supported.
   * Must be larger or equal to 36x36.
   * Must be smaller or equal to 4096x4096.
   * Must be smaller than 5 MB.
   */
  encodedData: string;
};
