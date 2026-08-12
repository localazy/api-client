import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

/**
 * Shared request shape for the per-key suggestion endpoints.
 */
export type SuggestionsRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * The target language to translate into, as a locale code (e.g. `pt_BR`)
   * or Localazy's numeric language id (e.g. `112`).
   */
  to: `${Locales}` | number;

  /**
   * Optional source language override, as a locale code (e.g. `en`) or numeric
   * language id (e.g. `85`). Defaults to the project's source language.
   */
  from?: `${Locales}` | number;
};
