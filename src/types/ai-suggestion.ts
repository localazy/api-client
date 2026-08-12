import type { LocalazyAiEngineName } from '@/types/localazy-ai-engine-name.js';

/**
 * A Localazy AI suggestion.
 */
export type AiSuggestion = {
  /**
   * The suggested translation value.
   */
  value: string;

  /**
   * The engine that produced this suggestion. Known engines autocomplete;
   * unrecognised values are still valid.
   */
  engine: LocalazyAiEngineName;
};
