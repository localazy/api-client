export type KeyComment = {
  /**
   * Comment ID.
   */
  id: string;

  /**
   * ID of the user that wrote the comment.
   */
  userId: string;

  text: string;

  /**
   * `true` when the author changed the comment after writing it.
   */
  edited: boolean;

  /**
   * Time of the last change, ISO 8601 in UTC.
   */
  updatedAt: string;
};
