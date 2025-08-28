import type { Key } from '@/types/key';
import type { Project } from '@/types/project';

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
