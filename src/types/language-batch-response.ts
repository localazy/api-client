export type LanguageBatchResult<TState extends string> = {
  /**
   * Numeric ID of the resolved language.
   */
  id: number;

  /**
   * Locale code the request resolved to. Compare it with what you sent: an unknown region falls back
   * to the plain language.
   */
  code: string;

  state: TState;
};

export type LanguageBatchResponse<TState extends string> = {
  /**
   * Always `true`; a request that cannot be applied is rejected instead.
   */
  result: boolean;

  /**
   * One entry per distinct resolved language, in the order of the request.
   */
  languages: LanguageBatchResult<TState>[];
};
