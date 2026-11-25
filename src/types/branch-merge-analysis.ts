export type BranchMergeLanguageChanges = {
  /**
   * Locale code.
   */
  lang: string;

  /**
   * Translations of keys the target branch does not have; the merge creates these keys.
   */
  newKeys: number;

  /**
   * Translations of existing target keys that have no translation in this language there.
   */
  newTranslations: number;

  /**
   * Translations the merge replaces in the target branch.
   */
  updated: number;

  /**
   * Translations that are equal in both branches.
   */
  equal: number;

  /**
   * Differing translations the strategy did not resolve; the merge leaves them unchanged.
   */
  conflicts: number;

  /**
   * Translations the merge cannot apply, e.g. a plural value for a key that is not plural in the
   * target branch.
   */
  failures: number;

  /**
   * Conflicts resolved with the source value.
   */
  resolvedFromSource: number;

  /**
   * Conflicts resolved with the target value, which the merge writes back to the source branch.
   */
  resolvedFromTarget: number;
};

export type BranchMergeConflict = {
  /**
   * Locale code.
   */
  lang: string;

  /**
   * File display name.
   */
  file: string;

  /**
   * Key name as a list of segments.
   */
  key: string[];

  /**
   * Key ID in the source branch.
   */
  sourceKeyId: string;

  /**
   * Key ID in the target branch.
   */
  targetKeyId: string;

  /**
   * Shortened preview of the source value: a string is cut after 240 characters; an array or plural
   * value gives one `item: text` line per item, each cut after 80 characters. Absent when there is
   * no value. Read the full value through `keys` endpoints of the branch project.
   */
  sourceValue?: string;

  /**
   * Preview of the target value, in the same form as `sourceValue`.
   */
  targetValue?: string;
};

export type BranchMergeFailure = {
  /**
   * Locale code.
   */
  lang: string;

  /**
   * File display name.
   */
  file: string;

  /**
   * Key name as a list of segments.
   */
  key: string[];

  /**
   * Key ID in the source branch.
   */
  sourceKeyId: string;

  /**
   * Key ID in the target branch.
   */
  targetKeyId: string;

  /**
   * Cause, as an English sentence.
   */
  reason: string;

  /**
   * `true` when the target has no translation in this language and the value clashes with the
   * target key's source-language value; `false` when it clashes with the target translation.
   */
  againstSourceLanguage: boolean;
};

export type BranchMergeAnalysis = {
  /**
   * Counts per language that has at least one processed translation, ordered by locale code.
   */
  languages: BranchMergeLanguageChanges[];

  /**
   * Display names of files the merge creates in the target branch.
   */
  newFiles: string[];

  /**
   * Locale codes of languages the merge adds to the target branch.
   */
  newLanguages: string[];

  /**
   * Keys the merge deprecates in the target branch. Always `0` without `deprecateMissing` and
   * `mergeDeprecations`.
   */
  deprecatedKeys: number;

  /**
   * Present only when `details` includes `conflicts`.
   */
  conflicts?: BranchMergeConflict[];

  /**
   * Present only when `details` includes `failures`.
   */
  failures?: BranchMergeFailure[];
};
