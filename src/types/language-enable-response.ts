import type { LanguageBatchResponse } from '@/types/language-batch-response.js';

/**
 * What enabling did with a language:
 * - `enabled`: the language was left out of publishing and is now included.
 * - `unchanged`: the language was already included.
 */
export type LanguageEnableState = 'enabled' | 'unchanged';

export type LanguageEnableResponse = LanguageBatchResponse<LanguageEnableState>;
