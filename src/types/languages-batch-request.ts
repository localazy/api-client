import type { LanguageRef } from '@/types/language-ref.js';
import type { Project } from '@/types/project.js';

export type LanguagesBatchRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Up to 100 languages. If one of them can't be resolved (or, except when adding, isn't in the
   * project or is the source language), the whole request is rejected and nothing changes.
   * Entries that resolve to the same language collapse into one.
   */
  languages: LanguageRef[];
};
