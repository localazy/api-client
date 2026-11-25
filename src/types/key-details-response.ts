import type { File } from '@/types/file.js';
import type { KeyComment } from '@/types/key-comment.js';
import type { KeyPriority } from '@/types/key-priority.js';
import type { KeyState } from '@/types/key-state.js';
import type { KeyValue } from '@/types/key-value.js';
import type { ProjectTag } from '@/types/project-tag.js';

/**
 * The current source text of a key.
 */
export type KeyDetailSource = {
  /**
   * Locale code of the source language.
   */
  lang: string;

  /**
   * A string, an array of strings, or for a plural key an object keyed by `@`-prefixed plural class.
   */
  value: KeyValue;

  /**
   * Plural classes the source language uses in the project. Only for a plural key.
   */
  pluralForms?: string[];
};

/**
 * A version of a key that waits for a review.
 */
export type KeyDetailReview = {
  /**
   * Version ID; pass it to `keys.reviewTranslation()`.
   */
  versionId: string;

  /**
   * `null` when the stored value can't be read.
   */
  value: KeyValue | null;

  /**
   * ID of the user that wrote the version.
   */
  userId: string;
};

/**
 * A key in the requested language. `value` and `authorId` describe the current (approved)
 * version and are absent when the language has none.
 */
export type KeyDetailTranslation = {
  /**
   * Locale code of the requested language.
   */
  lang: string;

  value?: KeyValue;

  /**
   * Plural classes the requested language uses in the project. Only for a plural key.
   */
  pluralForms?: string[];

  /**
   * ID of the user that wrote the current version.
   */
  authorId?: string;

  state: KeyState;

  /**
   * The newest version that waits for a review; absent when none does.
   */
  review?: KeyDetailReview;
};

export type KeyDetail = {
  /**
   * Key ID.
   */
  id: string;

  /**
   * The key's path as a list of segments.
   */
  key: string[];

  /**
   * Shape of the key's values. Absent when the key has no value at all.
   */
  type?: 'string' | 'array' | 'plural';

  /**
   * The file that holds the key.
   */
  file?: File;

  deprecated: boolean;

  hidden: boolean;

  /**
   * Maximum length of a translation, or `-1` for no limit.
   */
  limit: number;

  /**
   * The developer comment that came with the key from the import; `''` when there is none.
   */
  comment: string;

  /**
   * The note written for the key in Localazy (what `keys.update()` sets as `comment`); `''` when
   * there is none.
   */
  contextNote: string;

  priority: KeyPriority;

  /**
   * Tags of the key, the priority tag included.
   */
  tags: Omit<ProjectTag, 'type'>[];

  /**
   * Absent when the key has no source text.
   */
  source?: KeyDetailSource;

  translation: KeyDetailTranslation;

  /**
   * Discussion of the key in the requested language, newest first. Reading it does not mark the
   * comments as read.
   */
  comments: KeyComment[];
};

/**
 * Why a requested key has no details:
 * - `not_found`: the project has no such key (also a deleted key or one of another project).
 * - `segmented_key`: the ID is a segmented key as a whole; request its segments instead.
 */
export type KeyDetailErrorCode = 'not_found' | 'segmented_key';

export type KeyDetailError = {
  /**
   * Key ID as requested.
   */
  id: string;

  error: KeyDetailErrorCode;
};

export type KeyDetailsResponse = {
  /**
   * Details of the requested keys that the project has, in request order.
   */
  keys: KeyDetail[];

  /**
   * One entry per requested key that has no entry in `keys`.
   */
  errors: KeyDetailError[];
};
