import type { PLURAL_CLASSES } from '@/enums/plural-class.js';

/**
 * A CLDR plural category. Derived from {@link PLURAL_CLASSES}.
 */
export type PluralClass = (typeof PLURAL_CLASSES)[number];

/**
 * A plural value keyed by plain CLDR class, as the **write** API expects:
 * `{ one: '1 item', other: '%d items' }`.
 */
export type PluralValue = Partial<Record<PluralClass, string>>;

/**
 * A plural value keyed by `@`-prefixed CLDR class, as the **read** API returns
 * and the **import** API expects: `{ '@one': '1 item', '@other': '%d items' }`.
 *
 * The prefix is not decoration — it is what distinguishes a plural from a
 * nested key group. On import, `{ one: '…', other: '…' }` without the prefix
 * creates two nested keys `KEY.one` and `KEY.other` rather than one plural key.
 */
export type PrefixedPluralValue = Partial<Record<`@${PluralClass}`, string>>;
