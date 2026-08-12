export type BooleanResult = {
  /**
   * Whether the operation was accepted.
   *
   * Note this reports that the request was processed, not that it changed
   * anything: key ids that do not resolve within the project are skipped, and
   * a call in which every id is unresolvable still answers `true`.
   */
  result: boolean;
};
