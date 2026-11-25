export type ProjectsListRequest = {
  /**
   * Include the organization object in the output.
   */
  organization?: boolean;

  /**
   * Include languages in the output.
   */
  languages?: boolean;

  /**
   * Also include hidden languages in `languages`. Implies `languages: true`.
   */
  hidden_languages?: boolean;
};
