import type { I18nJson } from '@/types/i18n-json.js';
import type { Json } from '@/types/json.js';
import { isPrefixedPluralObject } from '@/utils/plural.js';
import { chunk, isPlainObject, merge, setWith } from 'es-toolkit/compat';

export class JsonUtils {
  /**
   * Physical limit is 100000.
   */
  public static readonly CHUNK_LIMIT: number = 99000;

  static slice(json: I18nJson): I18nJson[] {
    const values: I18nJson[] = JsonUtils.sliceByValue(json);
    const chunks: I18nJson[][] = chunk(values, JsonUtils.CHUNK_LIMIT);

    return chunks.map((c: I18nJson[]) => JsonUtils.mergeChunkValues(c));
  }

  /**
   * Example input:
   * const json = {
   *   en: {
   *     headers: {
   *       name: 'Name',
   *       user: 'User',
   *     },
   *     'headers.company': 'Company',
   *     user: {
   *       role: ['Admin', 'Editor'],
   *     },
   *   },
   * };
   *
   * Example result:
   * const result = [
   *   { en: { headers: { name: 'Name' } } },
   *   { en: { headers: { user: 'User' } } },
   *   { en: { 'headers.company': 'Company' } },
   *   { en: { user: { role: ['Admin', 'Editor'] } } },
   * ];
   */
  protected static sliceByValue(json: Json, keys: string[] = []): Json[] {
    return Object.entries(json).reduce((prev: Json[], [key, value]: [string, Json]) => {
      if (isPlainObject(value) && !key.startsWith('@meta:') && !isPrefixedPluralObject(value)) {
        prev.push(...JsonUtils.sliceByValue(value, [...keys, key]));
      } else if (keys.length > 1) {
        prev.push(setWith({}, [...keys, key].join('.'), value, Object));
      } else if (typeof keys[0] !== 'undefined') {
        prev.push({ [keys[0]]: { [key]: value } });
      }
      return prev;
    }, []);
  }

  /**
   * Folds the leaves of one chunk back into a single object.
   *
   * Deliberately a fold rather than `merge(...values)`: spreading produces one
   * argument per leaf, so a payload approaching {@link CHUNK_LIMIT} overflows
   * the call stack before any request is sent.
   */
  protected static mergeChunkValues(values: Json[]): Json {
    return values.reduce<Json>((acc: Json, value: Json): Json => merge(acc, value), {});
  }
}
