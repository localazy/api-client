import { Locales } from '@localazy/languages';
import { AxiosRequestConfig } from 'axios';
import { setWith } from 'lodash-es';
import { ApiBase } from '~/api/methods/api-base';
import { ExportJsonRequest } from '~/types/export-json-request';
import { I18nJson } from '~/types/i18n-json';
import { Json } from '~/types/json';
import { Key } from '~/types/key';
import { KeyValue } from '~/types/key-value';

export class ApiExport extends ApiBase {
  /**
   * Export translated keys as JSON object.
   *
   * @param request Export JSON request config.
   * @param config Axios request config.
   */
  public async json(request: ExportJsonRequest, config?: AxiosRequestConfig): Promise<I18nJson> {
    const {
      project, file, langs, nestedKeys,
    }: ExportJsonRequest = request;

    const result: Key[][] = await Promise.all(
      langs.map(
        (lang: `${Locales}`): Promise<Key[]> => this.api.files.listKeys({ project, file, lang }, config),
      ),
    );

    return Object.fromEntries(ApiExport.mapLangs(langs, result, nestedKeys));
  }

  protected static mapLangs(langs: `${Locales}`[], result: Key[][], nestedKeys?: boolean) {
    return langs.map((lang: `${Locales}`, index: number) => [
      lang,
      ApiExport.mapResult(result[index], nestedKeys),
    ]);
  }

  protected static mapResult(keysList: Key[], nestedKeys?: boolean): Json {
    const entries: [string, KeyValue][] = keysList.map((key: Key) => [key.key.join('.'), key.value]);

    if (nestedKeys === false) {
      return Object.fromEntries(entries);
    }

    const nestedJson: Json = {};
    entries.forEach(([path, value]: [string, KeyValue]): void => {
      setWith(nestedJson, path, value);
    });
    return nestedJson;
  }
}
