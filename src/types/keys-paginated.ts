import type { Key } from '@/types/key.js';

export type KeysPaginated = {
  keys: Key[];

  /**
   * Next is the paging key. The field is not contained if there are no more pages.
   */
  next?: string;
};
