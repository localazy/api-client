import type { AiSuggestion } from '@/types/ai-suggestion.js';

/**
 * A source form and its Localazy AI suggestions.
 */
export type AiSuggestionSource = {
  /**
   * The source string these suggestions were computed for.
   */
  source: string;

  /**
   * Suggestions found for this source form. Empty when there are no hits.
   */
  suggestions: AiSuggestion[];
};

/**
 * Localazy AI suggestions for a single key.
 */
export type AiSuggestionsResponse = {
  /**
   * `true` when both AI suggestions and Machine Translation are enabled in the
   * project's settings and the target language is not the (possibly
   * overridden) source.
   *
   * Producing AI results additionally requires an active paid MT tier — with
   * both flags on but no such tier, the result can be empty with no error.
   */
  enabled: boolean;

  /**
   * Soft failures keyed by engine name — an engine erroring, AI credits being
   * depleted, or an engine timing out. A soft error never fails the request.
   * The reserved key `general` carries failures that belong to no single
   * engine, most commonly the key having no value in the source language.
   */
  errors?: Record<string, string>;

  /**
   * One entry per source form: a singular key yields one entry, a plural or
   * array key one per form. Empty when the key has no source text or the
   * target equals the source language.
   */
  items: AiSuggestionSource[];
};
