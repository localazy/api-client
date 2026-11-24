import type { LanguageRef } from '@/types/language-ref.js';
import type { Project } from '@/types/project.js';

export type LanguageSetFallbackRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The language to set the fallback for.
   */
  lang: LanguageRef;

  /**
   * The fallback language: a language of the project (hidden or unpublished ones too), not `lang`
   * itself and not one that would make a cycle. `null` removes the fallback.
   */
  fallback: LanguageRef | null;
};
