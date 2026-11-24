/**
 * State of a branch operation:
 * - `scheduled`, `in_progress`: still running; poll again.
 * - `done`: finished.
 * - `error`: stopped on an internal error; a merge may have been applied in part.
 * - `invalid_id`: the ID is unknown, expired (statuses are kept for 48 hours), or not an operation
 *   this project started through the API.
 */
export type BranchOperationState = 'scheduled' | 'in_progress' | 'done' | 'error' | 'invalid_id';

/**
 * The merge counts are present only for a merge that is `done`.
 */
export type BranchOperationStatus = {
  status: BranchOperationState;

  /**
   * New keys, new translations and updated translations in the target branch, excluding resolved
   * conflicts.
   */
  changes?: number;

  /**
   * Conflicts the strategy resolved with the source or the target value.
   */
  resolved?: number;

  /**
   * Conflicts the merge left unresolved. List them with `branches.analyzeMerge()`.
   */
  conflicts?: number;

  /**
   * Translations the merge could not apply.
   */
  failures?: number;

  /**
   * Files the merge created in the target branch.
   */
  newFiles?: number;

  /**
   * Languages the merge added to the target branch.
   */
  newLanguages?: number;
};
