import type { File } from '@/types/file';
import type { Project } from '@/types/project';
import type { Locales } from '@localazy/languages';

export type ExportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  file: File | string;

  langs: `${Locales}`[];
};
