export type SubmitTranslationResponse = {
  /**
   * Whether the translation was accepted.
   */
  result: boolean;

  /**
   * Identifier of the version created for the submitted translation.
   */
  versionId?: string;

  /**
   * Additional detail about the outcome.
   */
  message?: string;
};
