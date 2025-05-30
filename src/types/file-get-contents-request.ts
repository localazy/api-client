import { File } from '@/types/file';
import { Project } from '@/types/project';
import { Locales } from '@localazy/languages';

export type FileGetContentsRequest = {
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
};
