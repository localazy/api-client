import type { Locales } from '@localazy/languages';
import type { Project } from '@/types/project.js';

export type LanguageListKeysRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The language of the values, as a locale code; unlike the other language endpoints, this one
   * does not resolve numeric language ids.
   */
  lang: `${Locales}` | (string & Record<never, never>);

  /**
   * Also return deprecated keys, alongside the active ones.
   */
  deprecated?: boolean;

  /**
   * Number of keys per page, from 1 to 10000. Default 1000.
   */
  limit?: number;

  /**
   * Paging cursor from the previous page's `next`.
   */
  next?: string;

  /**
   * Also return `comment`, `hidden`, `deprecated` and `limit` of each key.
   */
  extra_info?: boolean;

  /**
   * Also return the custom `metadata` of each key.
   */
  metadata?: boolean;

  /**
   * Also return the `event` of each key, a marker of its last change in `lang`.
   */
  event?: boolean;

  /**
   * For a key with no approved value in `lang`, return its newest translation waiting for review
   * instead of an empty value.
   */
  unapproved?: boolean;

  /**
   * Return a linked duplicate key's own value instead of its canonical key's translation when
   * `false`. Default `true`.
   */
  resolve_duplicities?: boolean;
};
