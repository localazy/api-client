export type ProjectCustomRole = {
  /**
   * Number of the custom role, 1000 or higher.
   */
  number: number;

  /**
   * Key of the custom role; `null` when the organization no longer defines it.
   */
  key: string | null;

  /**
   * Current name of the custom role; `null` when the organization no longer defines it.
   */
  name: string | null;
};
