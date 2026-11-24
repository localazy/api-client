export type LanguageCopyResponse = {
  /**
   * Always `true`; a request that cannot be applied is rejected instead.
   */
  result: boolean;

  /**
   * The language the copy created.
   */
  language: {
    /**
     * Numeric ID of the resolved language.
     */
    id: number;

    /**
     * Locale code the request resolved to.
     */
    code: string;

    /**
     * Always `created`.
     */
    state: 'created';
  };
};
