/**
 * The CLDR plural categories.
 *
 * Single source of truth: the {@link PluralClass} type is derived from this
 * array, and the runtime check that recognises a plural value on the wire is
 * built from it too — so the type, the validation, and the wire format cannot
 * drift apart.
 *
 * Which subset a language actually uses is defined by CLDR — English uses
 * `one`/`other`, Czech `one`/`few`/`many`/`other`.
 */
export const PLURAL_CLASSES = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;
