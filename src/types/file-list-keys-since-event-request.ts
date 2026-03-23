import type { File } from '@/types/file.js';
import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type FileListKeysSinceEventRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * File object or File ID.
   */
  file: File | string;

  /**
   * Locale code. See Locales enum with all available codes.
   */
  lang: `${Locales}`;

  /**
   * Only return keys with event number greater than this value.
   * Pass null or omit to return all keys.
   */
  sinceEvent?: number | null;

  /**
   * Returns also deprecated keys.
   */
  deprecated?: boolean;

  /**
   * Receive additional info such as translation note, whether it's hidden etc.
   */
  extra_info?: boolean;

  /**
   * Receive also metadata for the key.
   */
  metadata?: boolean;
};

export type FileListKeysSinceEventResult = {
  /**
   * The filtered keys (only those with event > sinceEvent, or all if sinceEvent is null).
   */
  keys: Key[];

  /**
   * The maximum event number found across all returned keys (before filtering).
   * Null if no keys were returned.
   */
  maxEvent: number | null;
};
