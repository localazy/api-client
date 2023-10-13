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
};
