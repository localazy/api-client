import { Key } from '@/types/key';
import { Project } from '@/types/project';

export type KeyUpdateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * Set to 0 or greater to mark the key as deprecated in the corresponding version;
   * set to -1 to mark the key as not deprecated.
   */
  deprecated?: number;

  /**
   * Set to true to mark the key as hidden on Localazy.
   */
  hidden?: boolean;

  /**
   * Provide custom comment for translators.
   */
  comment?: string;

  /**
   * Change the character limit or set to -1 to disable it.
   */
  limit?: number;
};
