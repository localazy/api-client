import { PLURAL_CLASSES } from '@/enums/plural-class.js';
import type { PluralValue } from '@/types/plural-class.js';
import type { PluralMarker } from '@/types/plural-marker.js';
import { PLURAL_MARKER } from '@/types/plural-marker.js';
import { isPlainObject } from 'es-toolkit/compat';

/**
 * Declares a plural value, spelled once and rendered correctly per endpoint.
 *
 * Plural values have two spellings in the Localazy API: `import.json` and
 * `files.listKeys` use `@`-prefixed CLDR classes, while
 * `keys.submitTranslation` uses plain ones. On import the prefix is not
 * cosmetic — it is the only thing separating a plural from a nested key group,
 * so `{ ITEMS: { one: '…', other: '…' } }` silently creates two nested keys
 * `ITEMS.one` and `ITEMS.other`, with no error from the API or the compiler.
 *
 * Wrapping the forms states the intent explicitly, so the client can emit the
 * right spelling and that mistake becomes unreachable.
 *
 * @example
 * ```typescript
 * // import -> { "ITEMS": { "@one": "%d item", "@other": "%d items" } }
 * await api.import.json({
 *   project,
 *   json: { en: { ITEMS: plural({ one: '%d item', other: '%d items' }) } },
 * });
 *
 * // submit -> { "value": { "one": "%d élément", "other": "%d éléments" } }
 * await api.keys.submitTranslation({
 *   project,
 *   key,
 *   lang: 'fr',
 *   value: plural({ one: '%d élément', other: '%d éléments' }),
 * });
 * ```
 *
 * @param forms Translations keyed by plain CLDR plural class.
 */
const plural = (forms: PluralValue): PluralMarker => ({
  [PLURAL_MARKER]: true,
  forms,
});

/**
 * Whether a value was produced by {@link plural}.
 */
const isPluralMarker = (value: unknown): value is PluralMarker =>
  isPlainObject(value) && (value as Record<string, unknown>)[PLURAL_MARKER] === true;

/**
 * Renders a marker's forms with the `@` prefix the import API uses to
 * distinguish plurals from nested keys.
 */
const toPrefixedForms = (marker: PluralMarker): Record<string, string> => {
  const prefixed: Record<string, string> = {};

  for (const [cls, text] of Object.entries(marker.forms)) {
    if (typeof text === 'string') {
      prefixed[cls.startsWith('@') ? cls : `@${cls}`] = text;
    }
  }

  return prefixed;
};

/**
 * CLDR plural classes as they appear on the wire, i.e. `@`-prefixed.
 *
 * Derived from {@link PLURAL_CLASSES} rather than restated, so adding a class
 * cannot leave the runtime check behind the type.
 */
const PREFIXED_CLASSES: ReadonlySet<string> = new Set(
  PLURAL_CLASSES.map((cls: string): string => `@${cls}`),
);

/**
 * Whether an object carries `@`-prefixed plural classes, i.e. is a plural value
 * in wire form rather than a nested key group.
 *
 * Used by the chunker to keep a plural's classes together: each class would
 * otherwise become its own leaf and could be split across two chunks, sending
 * one key's forms as two separate files.
 */
const isPrefixedPluralObject = (value: unknown): boolean =>
  isPlainObject(value) &&
  Object.keys(value as Record<string, unknown>).some((key: string): boolean =>
    PREFIXED_CLASSES.has(key),
  );

const encodeNode = (node: unknown): unknown => {
  if (isPluralMarker(node)) {
    return toPrefixedForms(node);
  }

  if (Array.isArray(node)) {
    return node.map((item: unknown): unknown => encodeNode(item));
  }

  if (isPlainObject(node)) {
    const mapped: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      mapped[key] = encodeNode(value);
    }

    return mapped;
  }

  return node;
};

/**
 * Replaces every {@link plural} marker in an import payload with its
 * `@`-prefixed form, leaving all other content untouched.
 *
 * Must run before the payload is chunked: the chunker recurses into every plain
 * object, so an unresolved marker would be split across chunks and reassembled
 * into the request verbatim.
 */
const encodePluralMarkers = <T>(node: T): T => encodeNode(node) as T;

export { encodePluralMarkers, isPluralMarker, isPrefixedPluralObject, plural };
