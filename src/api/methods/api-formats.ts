import { ApiBase } from '@/api/methods/api-base';
import { Format } from '@/types/format';
import { RequestConfig } from '@/types/request-config';

export class ApiFormats extends ApiBase {
  /**
   * List all {@link Format  formats} and related options.
   *
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/import#list-available-file-types  Localazy API Docs}
   */
  public async list(config?: RequestConfig): Promise<Format[]> {
    return (await this.api.client.get('/import/formats', config)) as Format[];
  }
}
