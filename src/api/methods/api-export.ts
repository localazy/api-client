import { ApiBase } from '@/api/methods/api-base';
import type { ExportJsonRequest } from '@/types/export-json-request';
import type { I18nJson } from '@/types/i18n-json';
import type { Json } from '@/types/json';
import type { Key } from '@/types/key';
import type { RequestConfig } from '@/types/request-config';
import type { Locales } from '@localazy/languages';

export class ApiExport extends ApiBase {
  /**
   * Export translated keys as JSON object.
   *
   * @param request Export JSON request config.
   * @param config Request config.
   */
  public async json(request: ExportJsonRequest, config?: RequestConfig): Promise<I18nJson> {
    const { project, file, langs }: ExportJsonRequest = request;

    const result: Key[][] = await Promise.all(
      langs.map((lang: `${Locales}`): Promise<Key[]> => this.api.files.listKeys({ project, file, lang }, config)),
    );

    return Object.fromEntries(ApiExport.mapLanguages(langs, result));
  }

  protected static mapLanguages(languages: `${Locales}`[], result: Key[][]) {
    // @ts-expect-error TODO check possible undefined
    return languages.map((lang: `${Locales}`, index: number) => [lang, ApiExport.mapResult(result[index])]);
  }

  protected static mapResult(keysList: Key[]): Json {
    return keysList.reduce((acc: Json, cur: Key): Json => {
      const parts: string[] = cur.key;

      // Flat: single-item array key stays as-is, even if it contains dots
      if (parts.length <= 1) {
        const only = parts[0];
        if (only !== undefined) {
          acc[only] = cur.value;
        }
        return acc;
      }

      // Nested: array key → build nested objects by segments
      let node: any = acc;
      for (let i = 0; i < parts.length; i++) {
        const seg = parts[i];
        const isLast = i === parts.length - 1;

        if (seg !== undefined) {
          if (isLast) {
            node[seg] = cur.value;
          } else {
            if (node[seg] === undefined) {
              node[seg] = {};
            }
            node = node[seg];
          }
        }
      }

      return acc;
    }, {});
  }
}
