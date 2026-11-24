import type { LanguageBatchResponse } from '@/types/language-batch-response.js';

/**
 * What adding did with a language:
 * - `created`: the language was not in the project and was added empty.
 * - `restored`: the language was hidden and is listed again with its previous translations, and
 *   published even if it was disabled before it was hidden.
 * - `unchanged`: the language was already listed; nothing was touched.
 */
export type LanguageAddState = 'created' | 'restored' | 'unchanged';

export type LanguageAddResponse = LanguageBatchResponse<LanguageAddState>;
