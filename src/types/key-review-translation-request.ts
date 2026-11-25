import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

/**
 * - `approve`: the version becomes current, and the other versions that wait for a review are
 *   rejected.
 * - `reject`: the version is rejected. The current version cannot be rejected.
 */
export type KeyReviewAction = 'approve' | 'reject';

export type KeyReviewTranslationRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * The language of the version, as a locale code (e.g. `pt_BR`) or Localazy's numeric language id
   * (e.g. `112`). It may be the source language.
   */
  lang: `${Locales}` | number;

  /**
   * ID of a version of this key in `lang`, e.g. `translation.review.versionId` of
   * `keys.getDetails()`.
   */
  versionId: string;

  action: KeyReviewAction;

  /**
   * Only for approving a source-language version that changes the source text: whether the
   * translations get the `sourceChanged` state. Defaults to `true`.
   */
  sourceChanged?: boolean;
};
