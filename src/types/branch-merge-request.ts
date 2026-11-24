import type { Branch } from '@/types/branch.js';
import type { BranchMergeStrategy } from '@/types/branch-merge-strategy.js';
import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type BranchMergeRequest = {
  /**
   * Project object or Project ID of any branch of the project.
   */
  project: Project | string;

  /**
   * Source branch, the one that gives the changes, by name or as a Branch object.
   */
  branch: Branch | Pick<Branch, 'name'> | string;

  /**
   * Target branch, the one that receives the changes. Must differ from `branch`.
   */
  target: Branch | Pick<Branch, 'name'> | string;

  /**
   * Defaults to `skip`.
   */
  strategy?: BranchMergeStrategy;

  /**
   * Languages to process, as locale codes (`pt_BR`) or numeric language IDs. Defaults to all
   * languages of the source branch that are not hidden. Must not be empty.
   */
  languages?: string[];

  /**
   * Keys of the source branch to process. IDs that are not keys of the source branch are ignored.
   * Defaults to all keys. Must not be empty.
   */
  keys?: (Key | Pick<Key, 'id'> | string)[];

  /**
   * Create files the target branch does not have. Defaults to `true`; with `false`, translations
   * that need a new file are left out.
   */
  createFiles?: boolean;

  /**
   * Add languages the target branch does not have. Defaults to `true`; with `false`, translations
   * that need a new language are left out.
   */
  createLanguages?: boolean;

  /**
   * Create keys the target branch does not have. Defaults to `true`.
   */
  createKeys?: boolean;

  /**
   * Leave alone every key and language that already has a translation in the target branch.
   * Defaults to `false`.
   */
  skipExisting?: boolean;

  /**
   * Process only differing translations; add no keys and no translations. Defaults to `false`.
   */
  conflictsOnly?: boolean;

  /**
   * Deprecate target keys that the source branch does not have. Applies only when the source
   * language is processed, and cannot be combined with `keys`. Defaults to `false`.
   */
  deprecateMissing?: boolean;

  /**
   * Deprecate target keys that are deprecated in the source branch; keys only in the target stay
   * active. Applies only when the source language is processed and, with `keys`, only to those keys.
   * Defaults to `false`.
   */
  mergeDeprecations?: boolean;

  /**
   * Count the conflicts the strategy did not resolve. Defaults to `true`; `false` leaves them out of
   * the counts and of the conflict list.
   */
  reportConflicts?: boolean;
};
