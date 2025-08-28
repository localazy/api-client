import type { UploadStatus } from '@/enums/upload-status';

export type UploadSessionStatus = {
  /**
   * Possible status of the upload session.
   */
  status: UploadStatus;

  /**
   * Number of keys added in the upload session.
   */
  added?: number;

  /**
   * Number of keys updated in the upload session.
   */
  updated?: number;

  /**
   * Number of keys deprecated in the upload session.
   */
  deprecated?: number;
};
