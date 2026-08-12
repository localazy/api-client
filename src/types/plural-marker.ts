import type { PluralValue } from '@/types/plural-class.js';

/**
 * Property that brands a {@link PluralMarker}.
 *
 * Deliberately a plain string rather than a symbol: if a marker ever reached
 * the wire unresolved it shows up verbatim in the payload and is rejected,
 * whereas a symbol key would silently vanish through `JSON.stringify` and send
 * an empty object instead.
 */
export const PLURAL_MARKER = '__localazyPlural' as const;

/**
 * An explicitly-tagged plural value produced by `plural()`.
 *
 * Carrying the intent rather than inferring it from shape is what lets the
 * client render the right spelling per endpoint — `@`-prefixed classes on
 * import, plain classes on `keys.submitTranslation` — without having to guess
 * whether a bare object meant a plural or a nested key group.
 */
export type PluralMarker = {
  readonly [PLURAL_MARKER]: true;
  readonly forms: PluralValue;
};
