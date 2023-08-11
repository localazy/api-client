import { ScreenshotMetadata } from '~/types/screenshot-metadata';
import { ScreenshotPhrase } from '~/types/screenshot-phrase';
import { ScreenshotTag } from '~/types/screenshot-tag';

export type Screenshot = {
  /**
   * TODO docs
   */
  id: string;

  /**
   * TODO docs
   */
  url: string;

  /**
   * TODO docs
   */
  comment: string;

  /**
   * TODO docs
   */
  phrases: ScreenshotPhrase[];

  /**
   * TODO docs
   */
  tags: ScreenshotTag[];

  /**
   * TODO docs
   */
  ocrData: string;

  /**
   * TODO docs
   */
  metadata: ScreenshotMetadata,
};
