import { chunk, isPlainObject, merge, set } from 'lodash-es';
import { I18nJson } from '@/types/i18n-json';
import { Json } from '@/types/json';

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
      if (isPlainObject(value)) {
        prev.push(...JsonUtils.sliceByValue(value, [...keys, key]));
      } else if (keys.length > 1) {
        prev.push(set({}, [...keys, key].join('.'), value));
      } else {
        prev.push({ [keys[0]]: { [key]: value } });
      }
      return prev;
    }, []);
  }

  protected static mergeChunkValues(values: Json[]): Json {
    return merge(...(values as [number, Json]));
  }
}
