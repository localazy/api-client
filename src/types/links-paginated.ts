import type { Link } from '@/types/link.js';

export type LinksPaginated = {
  links: Link[];

  /**
   * Next is the paging key. The field is not contained if there are no more pages.
   */
  next?: string;
};
