import { ApiBase } from '@/api/methods/api-base';
import { ExportJsonRequest } from '@/types/export-json-request';
import { I18nJson } from '@/types/i18n-json';
import { Json } from '@/types/json';
import { Key } from '@/types/key';
import { RequestConfig } from '@/types/request-config';
import { Locales } from '@localazy/languages';

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
      const keys: string[] = [...cur.key];

      let key: string | undefined = keys.shift();
      let path: string = key || '';

      while (key) {
        if (keys.length === 0) {
          acc[path] = cur.value;
        } else if (!acc[path]) {
          acc[path] = {};
        }

        key = keys.shift();
        if (key) {
          path = `${path}.${key}`;
        }
      }

      return acc;
    }, {});
  }
}
