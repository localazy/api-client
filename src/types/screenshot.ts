import type { ScreenshotMetadata } from '@/types/screenshot-metadata.js';
import type { ScreenshotPhrase } from '@/types/screenshot-phrase.js';
import type { ScreenshotTag } from '@/types/screenshot-tag.js';

export type Screenshot = {
  id: string;

  url: string;

  comment: string;

  phrases: ScreenshotPhrase[];

  tags: ScreenshotTag[];

  ocrData: string;

  metadata: ScreenshotMetadata;
};
