export type PublishedRecord = {
  /**
   * Release tag ID, to pass as `tag` to the file download. Always `_e0` for `latest`.
   */
  tagId: string;

  /**
   * Release tag name; `latest` for the project's current content.
   */
  name: string;

  /**
   * Time of the last publish, ISO 8601 in UTC with up to 6 fraction digits; `null` when never
   * published. It changes on every publish, even when the files did not, so compare it with the
   * previous value, not with your clock.
   */
  publishedAt: string | null;
};
