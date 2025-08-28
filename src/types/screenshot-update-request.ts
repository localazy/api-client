import type { Project } from '@/types/project';
import type { Screenshot } from '@/types/screenshot';
import type { ScreenshotMetadata } from '@/types/screenshot-metadata';
import type { ScreenshotPhrase } from '@/types/screenshot-phrase';
import type { ScreenshotTag } from '@/types/screenshot-tag';

export type ScreenshotUpdateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Screenshot object or Screenshot ID.
   */
  screenshot: Screenshot | string;

  /**
   * Custom comment for the screenshot
   */
  comment?: string;

  /**
   * Add or remove tags. Adding has priority over removing. Cannot be used together with tags.
   */
  addTags?: ScreenshotTag[];
  removeTags?: ScreenshotTag[];

  /**
   * Replace tags with the current value. Cannot be used together with addTags and/or removeTags.
   */
  tags?: ScreenshotTag[];

  /**
   * Add or remove linked phrases. Adding has priority over removing. Cannot be used together with phrases.
   */
  addPhrases?: ScreenshotPhrase[];
  removePhrases?: ScreenshotPhrase[];

  /**
   * Replace linked phrases with the current value. Cannot be used together with addPhrases and/or removePhrases.
   */
  phrases?: ScreenshotPhrase[];

  /**
   * Add or remove metadata. Adding has priority over removing. Cannot be used together with metadata.
   */
  addMetadata?: ScreenshotMetadata;
  removeMetadata?: string[];

  /**
   * Replace metadata with the current value. Cannot be used together with addMetadata and/or removeMetadata.
   */
  metadata?: ScreenshotMetadata;
};
