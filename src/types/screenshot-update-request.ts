import { Project } from '@/types/project';
import { Screenshot } from '@/types/screenshot';
import { ScreenshotMetadata } from '@/types/screenshot-metadata';
import { ScreenshotPhrase } from '@/types/screenshot-phrase';
import { ScreenshotTag } from '@/types/screenshot-tag';

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
  addMetaData?: ScreenshotMetadata;
  removeMetaData?: string[];

  /**
   * Replace metadata with the current value. Cannot be used together with addMetadata and/or removeMetadata.
   */
  metadata?: ScreenshotMetadata;
};
