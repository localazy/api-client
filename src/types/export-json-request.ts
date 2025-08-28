import type { File } from '@/types/file.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type ExportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  file: File | string;

  langs: `${Locales}`[];
};
