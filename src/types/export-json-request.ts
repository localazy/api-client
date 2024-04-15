import { Locales } from '@localazy/languages';
import { File } from '@/types/file';
import { Project } from '@/types/project';

export type ExportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  file: File | string;

  langs: `${Locales}`[];
};
