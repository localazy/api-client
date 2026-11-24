import type { Key } from '@/types/key.js';

export type LanguageKey = Key & {
  /**
   * ID of the file that holds the key; a key of `files` in the page.
   */
  file: string;
};
