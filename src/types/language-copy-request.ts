import type { LanguageRef } from '@/types/language-ref.js';
import type { Project } from '@/types/project.js';

export type LanguageCopyRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The language to copy. It must be in the project and not hidden.
   */
  from: LanguageRef;

  /**
   * The language to create. It must not be in the project, unless it is hidden: then the
   * translations it kept are destroyed before the copy.
   */
  to: LanguageRef;
};
