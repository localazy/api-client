import type { KeyValue } from '@/types/key-value.js';

export type Key = {
  /**
   * Key ID.
   */
  id: string;

  /**
   * Nested keys are stored as array entries. Simple keys are arrays containing single item.
   */
  key: string[];

  value: KeyValue;

  /**
   * Associated comment for translators.
   * Only available when extra_info=true.
   */
  comment?: string;

  /**
   * Information about the deprecation state of the key (-1 = not deprecated).
   * Only available when extra_info=true.
   */
  deprecated?: number;

  /**
   * Information about whether the key is marked as hidden or visible on Localazy.
   * Only available when extra_info=true.
   */
  hidden?: boolean;

  /**
   * Information about the character limit (-1 = no limit specified).
   * Only available when extra_info=true.
   */
  limit?: number;
};
