import type { LanguageBatchResponse } from '@/types/language-batch-response.js';

/**
 * What hiding did with a language:
 * - `hidden`: the language was listed and is not any more; its translations are kept.
 * - `unchanged`: the language was already hidden.
 */
export type LanguageHideState = 'hidden' | 'unchanged';

export type LanguageHideResponse = LanguageBatchResponse<LanguageHideState>;
