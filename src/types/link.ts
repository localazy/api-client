export type Link = {
  /**
   * ID of the linked key in this project; publishing takes its content from `linkedKeyId`.
   */
  keyId: string;

  /**
   * ID of the project the target key belongs to.
   */
  linkedProjectId: string;

  /**
   * ID of the target key.
   */
  linkedKeyId: string;
};
