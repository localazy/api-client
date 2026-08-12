import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type KeySetTagsRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Keys to apply the tag changes to. Up to 1000 keys per call.
   */
  keys: (Key | Pick<Key, 'id'> | string)[];

  /**
   * Tag names to add. Names that do not exist yet are created, subject to the
   * project's 50-tag limit.
   */
  addTags?: string[];

  /**
   * Tag names to remove. Removal is applied before addition, so a name present
   * in both `addTags` and `removeTags` ends up added.
   */
  removeTags?: string[];
};
