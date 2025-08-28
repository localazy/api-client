import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeyDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;
};
