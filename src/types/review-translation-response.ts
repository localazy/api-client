export type ReviewTranslationResponse = {
  /**
   * `true` when the review was applied; `false` when the project is momentarily locked (see
   * `message`) and the call should be retried.
   */
  result: boolean;

  /**
   * The reason when `result` is `false`.
   */
  message?: string;
};
