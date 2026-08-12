import type { TRANSLATION_ENGINES } from '@/enums/translation-engine.js';

/**
 * Translation engines known at the time this client was published.
 */
export type KnownTranslationEngine = (typeof TRANSLATION_ENGINES)[number];

/**
 * The name of the translation engine that produced a Machine Translation
 * suggestion.
 *
 * Known engines are offered as autocomplete, but any string is accepted: the
 * active engine set is deployment configuration and can grow without a client
 * release.
 */
export type TranslationEngineName = KnownTranslationEngine | (string & Record<never, never>);
