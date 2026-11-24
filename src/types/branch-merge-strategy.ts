/**
 * How a merge handles a translation that differs between the two branches:
 * - `skip`: every difference is a conflict and stays as it is.
 * - `reference`: updates the target when it still has the value the source started from;
 *   otherwise a conflict.
 * - `time`: the source value wins when it is newer; otherwise a conflict.
 * - `time-bidi`: as `time`, and a newer target value is written back to the source branch.
 * - `source`: the source value always wins.
 * - `target`: the target value always wins and is written back to the source branch.
 */
export type BranchMergeStrategy = 'skip' | 'reference' | 'time' | 'time-bidi' | 'source' | 'target';
