import { Locales } from '@localazy/languages';
import { File } from '@/types/file';
import { Project } from '@/types/project';

export type FileListKeysRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * File object or File ID.
   */
  file: File | string;

  /**
   * Locale code. See Locales enum with all available codes.
   */
  lang: `${Locales}`;

  /**
   * Returns also deprecated keys.
   */
  deprecated?: boolean;

  /**
   * Number of keys to be returned in a single call (max 1000). Default 1000.
   */
  limit?: number;

  /**
   * Used for paging long lists.
   */
  next?: string;

  /**
   * Receive additional info such as translation note, whether it's hidden etc.
   */
  extra_info?: boolean;
};
