import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type LinkDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID of the linked key whose link is removed.
   */
  key: Key | string;
};
