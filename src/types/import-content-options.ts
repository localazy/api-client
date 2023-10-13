export type ImportContentOptions = {
  /**
   * The file type to be used for backing the strings. @see https://localazy.com/docs/api/import#response-1
   * Default: 'api'
   */
  type?: string;

  /**
   * Plural type to be used for encoding plurals in the output file. Available options depend on the type.
   * @see [Formats](https://localazy.com/docs/api/import#retrieve-a-list-of-available-file-types)
   */
  plural?: string;

  /**
   * Defines how to encode string arrays. Available options depend on the type
   * @see [Formats](https://localazy.com/docs/api/import#retrieve-a-list-of-available-file-types)
   */
  array?: string;

  /**
   * Defines how to transform structured keys for formats into plain string ones for a format that doesn't
   * support structured keys. Available options depend on the type.
   * @see [Formats](https://localazy.com/docs/api/import#retrieve-a-list-of-available-file-types)
   */
  keyTransformer?: string;

  /**
   * Key-value map of additional parameters that may be necessary for array, plural and keyTransformer.
   * @see [Formats](https://localazy.com/docs/api/import#retrieve-a-list-of-available-file-types)
   */
  params?: Record<string, any>;

  /**
   * List of additional features for the given type. Available options depend on the type
   * @see [Integration quick starts](https://localazy.com/docs/integrations)
   */
  features?: string[];
};
