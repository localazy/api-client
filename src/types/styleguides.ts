export type Styleguides = {
  /**
   * The style guide for all languages. Absent when the project has none.
   */
  general?: string;

  /**
   * Style guides by language code. Languages without one are absent.
   */
  languages: Record<string, string>;
};
