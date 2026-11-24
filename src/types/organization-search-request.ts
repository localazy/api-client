import type { Project } from '@/types/project.js';

/**
 * What a search result matched:
 * - `key`: the name of the key.
 * - `comment`: the comment from the import or the context note of the key.
 * - `translation`: the value of the key in one language, the source language included.
 */
export type OrganizationSearchMatch = 'key' | 'comment' | 'translation';

export type OrganizationSearchRequest = {
  /**
   * ID or slug of a top-level organization; teams can't be searched.
   */
  organization: string;

  /**
   * Text to search for, 2 to 4096 characters. Full-text: every word must match, and only the first
   * 10 words are used.
   */
  term: string;

  /**
   * Search only in these projects, 1 to 1000. An empty list is rejected, since the server would read
   * it as all projects.
   */
  projects?: (Project | string)[];

  /**
   * Do not search in these projects. At most 1000.
   */
  excludeProjects?: (Project | string)[];

  /**
   * Kinds of matches to return. All of them when omitted.
   */
  match?: OrganizationSearchMatch[];

  /**
   * Return `translation` matches only in these languages; `key` and `comment` matches are not
   * filtered. Needs `translation` in `match` when `match` is given.
   */
  langs?: string[];
};
