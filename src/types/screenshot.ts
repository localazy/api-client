import { ScreenshotMetadata } from '~/types/screenshot-metadata';
import { ScreenshotPhrase } from '~/types/screenshot-phrase';
import { ScreenshotTag } from '~/types/screenshot-tag';

export type Screenshot = {
  id: string;

  url: string;

  comment: string;

  phrases: ScreenshotPhrase[];

  tags: ScreenshotTag[];

  ocrData: string;

  metadata: ScreenshotMetadata,
};
