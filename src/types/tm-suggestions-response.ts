import type { TmSuggestion } from '@/types/tm-suggestion.js';

/**
 * A source form and its Translation Memory suggestions.
 */
export type TmSuggestionSource = {
  /**
   * The source string these suggestions were computed for.
   */
  source: string;

  /**
   * Suggestions found for this source form. Empty when there are no hits.
   */
  suggestions: TmSuggestion[];
};

/**
 * Translation Memory (InTM) suggestions for a single key.
 */
export type TmSuggestionsResponse = {
  /**
   * Whether Translation Memory could run for this request. `false` means the
   * feature is unavailable for the project, or the target language is the
   * (possibly overridden) source language.
   *
   * Note that `enabled: true` with empty `items` means "no hits", which is a
   * different answer from "feature off".
   */
  enabled: boolean;

  /**
   * Soft failures keyed by engine name. A soft error never fails the request.
   * The reserved key `general` carries failures that belong to no single
   * engine, most commonly the key having no value in the source language.
   */
  errors?: Record<string, string>;

  /**
   * One entry per source form: a singular key yields one entry, a plural or
   * array key one per form. Empty when the key has no source text or the
   * target equals the source language.
   */
  items: TmSuggestionSource[];
};
