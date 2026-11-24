import type { Project } from '@/types/project.js';

export type LinkListRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Number of links to be returned in a single call. Values outside the token's key-export limit
   * (1000 by default) fall back to that limit.
   */
  limit?: number;

  /**
   * Used for paging long lists.
   */
  next?: string;
};
