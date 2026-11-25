import type { LanguageRef } from '@/types/language-ref.js';
import type { Project } from '@/types/project.js';

export type LanguageReplaceRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The language to replace. It must be in the project, not hidden and not the source language.
   * **It stops existing**: its translations move to `replaceWith`.
   */
  language: LanguageRef;

  /**
   * The language to move the translations to. It must not be in the project, unless it is hidden:
   * then the translations it kept are destroyed first.
   */
  replaceWith: LanguageRef;
};
