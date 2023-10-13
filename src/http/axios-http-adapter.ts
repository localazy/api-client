import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults,
} from 'axios';
import { isNumber, isPlainObject, isString } from 'lodash-es';
import { LocalazyError } from '~/errors/localazy-error';
import { IHttpAdapter } from '~/http/i-http-adapter';
import { ApiClientOptions } from '~/types/api-client-options';

export class AxiosHttpAdapter implements IHttpAdapter {
  public client: AxiosInstance;

  constructor(options: ApiClientOptions, config?: CreateAxiosDefaults) {
    this.client = AxiosHttpAdapter.clientFactory(
      options.apiUrl || 'https://api.localazy.com',
      options.authToken,
      config,
    );
  }

  protected static clientFactory(baseURL: string, authToken: string, config?: CreateAxiosDefaults): AxiosInstance {
    const client: AxiosInstance = axios.create({
      ...config,
      baseURL,
      headers: {
        common: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });

    client.interceptors.response.use(
      (response: AxiosResponse<any, any>) => response.data,
      (err: any): Promise<never> => {
        const data = err.response?.data;
        if (isPlainObject(data) && isNumber(data.code) && isString(data.error)) {
          return Promise.reject(new LocalazyError(data.error, data.code, { cause: err }));
        }
        return Promise.reject(err);
      },
    );

    return client;
  }

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.client.post(url, data, config);
  }

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.client.put(url, data, config);
  }

  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.client.get(url, config);
  }

  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.client.delete(url, config);
  }
}
