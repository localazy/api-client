/**
 * What a batch did with each item. Each list names items by their source-language text, in request
 * order.
 */
export type GlossaryCreateManyResponse = {
  /**
   * Always `true`; a batch that cannot be applied is rejected instead.
   */
  result: boolean;

  /**
   * Items created as new terms.
   */
  created: string[];

  /**
   * Items merged into an existing term that they changed.
   */
  updated: string[];

  /**
   * Items that changed nothing or repeated an earlier item of the batch.
   */
  skipped: string[];
};
