export type AiTranslateResponseItem = {
  /**
   * The key identifier as provided in the request. null if not provided.
   */
  key: string | null;

  /**
   * The original source text as provided in the request.
   */
  source: string | Record<string, string>;

  /**
   * The translated text. Can be a string or an object with plural forms,
   * matching the format of the source. May be null if the translation failed for a specific item.
   */
  translation: string | Record<string, string> | null;
};
