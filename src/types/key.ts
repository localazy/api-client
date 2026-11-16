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

  /**
   * Event number representing the last modification event for this key.
   * Only available when event=true in the request.
   */
  event?: number;

  /**
   * Custom metadata of the key. Only available when `metadata: true` is requested.
   *
   * Absent when the key's metadata was never written. Once any write has touched it (an import's
   * `@meta`, the web app, `keys.update` or `keys.setMetadata`, even one that only removed a name the
   * key didn't have), it stays an object: `{}` after its last entry was removed. So `{}` tells that
   * the metadata was edited at some point, though not where or when; check entries, not whether the
   * field is present.
   */
  metadata?: Record<string, unknown>;
};
