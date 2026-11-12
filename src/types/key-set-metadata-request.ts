import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeyMetadataChange = {
  /**
   * Key object or Key ID.
   */
  key: Key | Pick<Key, 'id'> | string;

  /**
   * Entries to merge into the key's custom metadata. Each top-level entry replaces the entry of the
   * same name; all other entries are kept. Values may be any JSON; serialized, it may be up to 32767
   * characters.
   */
  addMetadata?: Record<string, unknown>;

  /**
   * Names of top-level entries to remove from the key's custom metadata. Names the key doesn't have
   * are ignored. Removal is applied before addition, so a name present in both ends up added.
   */
  removeMetadata?: string[];
};

export type KeySetMetadataRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Keys and their changes, up to 1000 per call. A key may be listed only once, and each change must
   * add or remove something.
   */
  keys: KeyMetadataChange[];
};
