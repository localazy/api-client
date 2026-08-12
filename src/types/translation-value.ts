import type { PluralValue, PrefixedPluralValue } from '@/types/plural-class.js';
import type { PluralMarker } from '@/types/plural-marker.js';

/**
 * A translation value accepted by the write API.
 *
 * The shape must match the key's form: a string for a singular key, an array of
 * strings for an array key, or an object keyed by CLDR plural class for a
 * plural key.
 *
 * Both plural spellings are accepted — the plain classes the write API expects
 * ({@link PluralValue}) and the `@`-prefixed form the read API returns
 * ({@link PrefixedPluralValue}) — because passing a value straight back from
 * `files.listKeys()` is the natural thing to do. The client strips the prefix
 * before sending.
 *
 * Prefer `plural()` when authoring a value by hand — it states the intent
 * explicitly and renders the correct spelling for whichever endpoint it is
 * passed to.
 *
 * Note that the plural classes are checked only when you pass an object
 * *literal*: a value held in a variable typed `Record<string, any>`, which is
 * what `Key.value` is, satisfies this type without inspection.
 */
export type TranslationValue = string | string[] | PluralValue | PrefixedPluralValue | PluralMarker;
