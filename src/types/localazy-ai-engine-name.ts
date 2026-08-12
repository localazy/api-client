import type { LOCALAZY_AI_ENGINES } from '@/enums/translation-engine.js';

/**
 * Localazy AI engines known at the time this client was published.
 */
export type KnownLocalazyAiEngine = (typeof LOCALAZY_AI_ENGINES)[number];

/**
 * The name of the engine that produced a Localazy AI suggestion.
 *
 * Known engines are offered as autocomplete, but any string is accepted: the
 * active engine set is deployment configuration and can grow without a client
 * release.
 */
export type LocalazyAiEngineName = KnownLocalazyAiEngine | (string & Record<never, never>);
