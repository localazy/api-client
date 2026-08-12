import type { KeyPriority } from '@/types/key-priority.js';
import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeySetPriorityRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Keys to set the priority on. Up to 1000 keys per call.
   */
  keys: (Key | Pick<Key, 'id'> | string)[];

  /**
   * The priority level to assign. `normal` clears any priority currently set.
   */
  priority: KeyPriority;
};
