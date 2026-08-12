import type { KEY_PRIORITIES } from '@/enums/key-priority.js';

/**
 * A built-in priority level. Closed set — the API rejects any other value with
 * `invalid_tag`.
 */
export type KeyPriority = (typeof KEY_PRIORITIES)[number];
