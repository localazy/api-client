import type { TranslationValue } from '@/types/translation-value.js';
import { isPluralMarker } from '@/utils/plural.js';

/**
 * Normalises a plural translation value for the write API.
 *
 * The read API returns plural forms keyed with an `@` prefix
 * (`{ '@one': '1 item', '@other': '%d items' }`) while the write API expects
 * plain CLDR classes (`{ one: '1 item', other: '%d items' }`). Submitting the
 * read shape unchanged would store the translation under plural classes named
 * `@one` / `@other`, which no CLDR consumer resolves — and the API accepts it
 * silently, so nothing surfaces the mistake.
 *
 * Stripping the prefix is unambiguous here: the target key is identified in the
 * URL, so an object value can only be a set of plural classes, and no valid
 * CLDR class begins with `@`. The same reasoning does *not* hold on import,
 * where the prefix is what separates a plural from a nested key group.
 *
 * A value produced by `plural()` is unwrapped to its plain forms.
 *
 * Strings and arrays are returned untouched.
 */
export const normalizeTranslationValue = (value: TranslationValue): TranslationValue => {
  if (isPluralMarker(value)) {
    return value.forms;
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return value;
  }

  const normalized: Record<string, string> = {};

  for (const [cls, text] of Object.entries(value)) {
    if (typeof text === 'string') {
      normalized[cls.startsWith('@') ? cls.slice(1) : cls] = text;
    }
  }

  return normalized;
};
