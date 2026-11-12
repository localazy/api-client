import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeyUpdateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * Set to 0 or greater to mark the key as deprecated in the corresponding version;
   * set to -1 to mark the key as not deprecated.
   */
  deprecated?: number;

  /**
   * Set to true to mark the key as hidden on Localazy.
   */
  hidden?: boolean;

  /**
   * Provide custom comment for translators.
   */
  comment?: string;

  /**
   * Change the character limit or set to -1 to disable it.
   */
  limit?: number;

  /**
   * Entries to merge into the key's custom metadata (`metadata` of `files.listKeys()` with
   * `metadata: true`). Each top-level entry replaces the entry of the same name; all other entries
   * are kept. Values may be any JSON; serialized, it may be up to 32767 characters.
   * Not accepted for a cluster-qualified key ID (`keyId:clusterKeyId`).
   */
  addMetadata?: Record<string, unknown>;

  /**
   * Names of top-level entries to remove from the key's custom metadata. Names the key doesn't have
   * are ignored. Removal is applied before addition, so a name present in both ends up added.
   * Not accepted for a cluster-qualified key ID (`keyId:clusterKeyId`).
   */
  removeMetadata?: string[];
};
