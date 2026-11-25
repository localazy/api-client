import type { LanguageBatchResponse } from '@/types/language-batch-response.js';

/**
 * What disabling did with a language:
 * - `disabled`: the language was included in publishing and is now left out.
 * - `unchanged`: the language was already left out.
 */
export type LanguageDisableState = 'disabled' | 'unchanged';

export type LanguageDisableResponse = LanguageBatchResponse<LanguageDisableState>;
