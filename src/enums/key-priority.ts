/**
 * Built-in priority levels a source key can be assigned.
 *
 * Unlike the engine lists this **is** a closed set: the API rejects any other
 * value with `invalid_tag`. `normal` clears any priority currently set.
 */
export const KEY_PRIORITIES = ['lowest', 'low', 'normal', 'high', 'highest'] as const;
