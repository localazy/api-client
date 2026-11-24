import type { LanguageRef } from '@/types/language-ref.js';
import type { Project } from '@/types/project.js';

export type LanguageDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The language to delete together with all of its translations.
   */
  lang: LanguageRef;
};
