export type Language = {
  /**
   * Internal identifier of the language on Localazy.
   */
  id: number;

  /**
   * Locale code.
   */
  code: string;

  /**
   * BCP 47 locale tag.
   */
  tag: string;

  /**
   * English name of the language / locale.
   */
  name: string;

  /**
   * Number of active keys.
   */
  active: number;

  /**
   * Number of keys waiting for review.
   */
  review: number;

  /**
   * Number of keys with approved version/translation.
   */
  current: number;

  /**
   * Number of keys that are already translated (but may not be approved yet).
   */
  translated: number;

  /**
   * Number of keys in the source changed state.
   */
  sourceChanged: number;

  /**
   * Number of keys in the need review state.
   */
  needImprovement: number;

  /**
   * Hidden languages are not listed in the project, but keep their translations, which come back
   * when the language is added again. Listed only with `hidden_languages: true`.
   */
  hidden: boolean;

  /**
   * The negation of `hidden`; prefer `hidden`.
   */
  enabled: boolean;

  /**
   * Whether publishing includes the language.
   */
  published: boolean;

  /**
   * Code of the language that supplies texts for keys untranslated in this one, or `null`. Applies
   * only to file outputs (publish, CDN, downloads), never to key listings.
   */
  fallback: string | null;
};
