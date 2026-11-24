import type { PrefixedPluralValue } from '@/types/plural-class.js';
import type { OrganizationSearchMatch } from '@/types/organization-search-request.js';

export type OrganizationSearchResult = {
  projectId: string;

  keyId: string;

  /**
   * The key's name as a list of segments, as `key` of `files.listKeys()`.
   */
  key: string[];

  /**
   * Path and name of the file that holds the key, for display.
   */
  file: string;

  match: OrganizationSearchMatch;

  /**
   * Language of `value`: the translation's language for a `translation` match, the project's source
   * language otherwise.
   */
  lang: string;

  /**
   * Current value in `lang`, shaped by the key's form; plural forms carry the `@` prefix. An empty
   * string when the key has no value in `lang`.
   */
  value: string | string[] | PrefixedPluralValue;

  /**
   * Developer comment from the import, or an empty string.
   */
  comment: string;

  /**
   * Note written for the key in Localazy, or an empty string.
   */
  contextNote: string;

  /**
   * Whether the key is hidden from translators.
   */
  hidden: boolean;
};

export type OrganizationSearchProject = {
  id: string;

  name: string;

  slug: string;
};

export type OrganizationSearchResponse = {
  /**
   * At most 2000 matches, with no paging. Matches containing the full term come first.
   */
  results: OrganizationSearchResult[];

  /**
   * The projects that have at least one match.
   */
  projects: OrganizationSearchProject[];
};
