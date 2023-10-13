import { Key } from '~/types/key';

export type KeysPaginated = {
  keys: Key[];

  /**
   * Next is the paging key. The field is not contained if there are no more pages.
   */
  next?: string;
};
