import type { Json } from '@/types/json.js';
import type { LocalesKeys } from '@/types/locales-keys.js';

/**
 * @example
 * ```json
 * {
 *   "en": {
 *     "headers": {
 *       "name": "Name"
 *     },
 *     "status": [
 *       "Published",
 *       "Draft"
 *     ],
 *     "tooltips.company": "Company"
 *   }
 * }
 * ```
 */
export type I18nJson = Partial<LocalesKeys> & Json;
