export type SubmitTranslationResponse = {
  /**
   * `true` when the value was stored or matched an existing version; `false` when the request was
   * understood but not applied (see `message`).
   */
  result: boolean;

  /**
   * ID of the stored (or matched) version. Present only when `result` is `true`.
   */
  versionId?: string;

  /**
   * The reason when `result` is `false`.
   */
  message?: string;
};
