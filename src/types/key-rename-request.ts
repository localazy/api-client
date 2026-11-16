import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeyRenameEntry = {
  /**
   * Key object or Key ID.
   */
  key: Key | Pick<Key, 'id'> | string;

  /**
   * The new name of the key as a list of segments, in the same form as `key` of `files.listKeys()`:
   * `['checkout', 'title']` names a nested key, `['checkout.title']` a flat key that contains a dot.
   * It needs at least one segment, and no segment may be empty or blank. Segments are stored exactly
   * as sent.
   */
  name: string[];
};

export type KeyRenameRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Keys and their new names, up to 1000 per call. A key may be listed only once.
   */
  keys: KeyRenameEntry[];
};
