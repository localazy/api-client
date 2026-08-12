/**
 * Engines a Machine Translation suggestion can be attributed to, i.e. the
 * values `api.suggestions.mt()` can report.
 *
 * These are third-party engines Localazy calls on your behalf. Membership is
 * about which endpoint reports the engine, not about the underlying
 * technology: `openai` is an LLM, but Localazy drives it as a translation
 * engine, so it is reported here and never by `api.suggestions.ai()`.
 *
 * This is **not** a closed set. Which engines are active is deployment
 * configuration and can change without a client release, so treat an
 * unrecognised value as valid rather than as an error — the list exists for
 * autocomplete, not for validation.
 */
export const TRANSLATION_ENGINES = ['amazon', 'azure', 'deepl', 'google', 'openai'] as const;

/**
 * Engines that produce Localazy AI suggestions, i.e. the values
 * `api.suggestions.ai()` can report.
 *
 * Localazy AI is a Localazy product rather than a third-party engine, which is
 * why it forms its own family. Internal and preview tiers are deliberately
 * omitted — they are gated behind feature flags and are not part of the public
 * surface.
 *
 * As with {@link TRANSLATION_ENGINES} this is an open set.
 */
export const LOCALAZY_AI_ENGINES = ['localazyAi'] as const;
