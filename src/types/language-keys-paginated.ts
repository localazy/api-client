import type { File } from '@/types/file.js';
import type { LanguageKey } from '@/types/language-key.js';

export type LanguageKeysPaginated = {
  keys: LanguageKey[];

  /**
   * Paging cursor. Absent on the last page.
   */
  next?: string;

  /**
   * The files of the keys on this page, by file ID. A file can continue on the next page.
   */
  files: Record<string, File>;
};
