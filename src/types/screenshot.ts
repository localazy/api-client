import type { ScreenshotMetadata } from '@/types/screenshot-metadata';
import type { ScreenshotPhrase } from '@/types/screenshot-phrase';
import type { ScreenshotTag } from '@/types/screenshot-tag';

export type Screenshot = {
  id: string;

  url: string;

  comment: string;

  phrases: ScreenshotPhrase[];

  tags: ScreenshotTag[];

  ocrData: string;

  metadata: ScreenshotMetadata;
};
