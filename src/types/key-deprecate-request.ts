import { Key } from '@/types/key';
import { Project } from '@/types/project';

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
