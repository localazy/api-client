import type { TranslationEngineName } from '@/types/translation-engine-name.js';

/**
 * A Machine Translation suggestion produced by a single engine.
 */
export type MtSuggestion = {
  /**
   * The suggested translation value.
   */
  value: string;

  /**
   * The machine translation engine that produced this suggestion. Known engines
   * autocomplete; unrecognised values are still valid.
   */
  engine: TranslationEngineName;
};
