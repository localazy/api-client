/**
 * The state of a key in one language, as four independent flags.
 */
export type KeyState = {
  /**
   * An approved version exists, or a version waits for a review.
   */
  translated: boolean;

  /**
   * A version waits for a review.
   */
  needReview: boolean;

  /**
   * The source text changed after the translation was made.
   */
  sourceChanged: boolean;

  /**
   * A reviewer marked the translation as needing improvement.
   */
  needImprovement: boolean;
};
