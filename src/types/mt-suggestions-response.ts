import type { TranslationEngineName } from '@/types/translation-engine-name.js';
import type { MtSuggestion } from '@/types/mt-suggestion.js';

/**
 * A source form and its Machine Translation suggestions, one per engine that
 * returned a result.
 */
export type MtSuggestionSource = {
  /**
   * The source string these suggestions were computed for.
   */
  source: string;

  /**
   * Suggestions found for this source form. Empty when there are no hits.
   */
  suggestions: MtSuggestion[];
};

/**
 * Machine Translation suggestions for a single key.
 */
export type MtSuggestionsResponse = {
  /**
   * Whether the project's Machine Translation switch is on and the target is
   * not the (possibly overridden) source language.
   *
   * This reflects the project switch only — it does not account for the
   * organization's entitlements. An organization whose paid MT tier has lapsed
   * still reports `enabled: true`, with empty `items` and no `errors`. So
   * `enabled: true` plus empty `items` means "no suggestions available", which
   * is not the same as "no matches exist".
   */
  enabled: boolean;

  /**
   * The project's **explicit** machine translation engine allow-list, present
   * only when one has been configured — which is uncommon, so this field is
   * usually absent. It is a restriction, not the effective engine set, so do
   * not treat its absence as "no engines available".
   */
  allowedEngines?: TranslationEngineName[];

  /**
   * Soft failures keyed by engine name — an engine erroring, the MT fair-use
   * quota being exhausted, or an engine timing out. A soft error never fails
   * the request. The reserved key `general` carries failures that belong to no
   * single engine, most commonly the key having no value in the source
   * language.
   */
  errors?: Record<string, string>;

  /**
   * One entry per source form: a singular key yields one entry, a plural or
   * array key one per form. Empty when the key has no source text or the
   * target equals the source language.
   */
  items: MtSuggestionSource[];
};
