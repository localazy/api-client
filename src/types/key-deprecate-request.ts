import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeyDeprecateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * List of keys identifiers to deprecate.
   */
  phrases: Key[] | Pick<Key, 'id'>[] | string[];
};
