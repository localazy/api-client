export type AiTranslateItem = {
  /**
   * Localization key identifier (e.g. btn_submit, welcome_message).
   * Provides context for more accurate translations. Maximum 512 characters.
   */
  key?: string;

  /**
   * The source text to translate. Can be a string for simple values,
   * or an object with plural forms (e.g. {"one": "1 item", "other": "%d items"}).
   */
  source: string | Record<string, string>;

  /**
   * A comment or note providing additional context for the translator.
   * Maximum 1000 characters.
   */
  comment?: string;

  /**
   * Maximum length for the translation in characters.
   * Must be between 0 and 32767.
   */
  lengthLimit?: number;
};
