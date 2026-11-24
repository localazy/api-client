import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type CommentListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * The language of the discussion, as a locale code (e.g. `pt_BR`) or Localazy's numeric language
   * id (e.g. `112`). It may be the source language.
   */
  lang: `${Locales}` | number;
};
