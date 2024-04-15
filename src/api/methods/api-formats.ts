import { AxiosRequestConfig } from 'axios';
import { ApiBase } from '@/api/methods/api-base';
import { Format } from '@/types/format';

export class ApiFormats extends ApiBase {
  /**
   * List all {@link Format  formats} and related options.
   *
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/import#list-available-file-types  Localazy API Docs}
   */
  public async list(config?: AxiosRequestConfig): Promise<Format[]> {
    return this.api.client.get('/import/formats', config);
  }
}
