import { IHttpAdapter } from '@/http/i-http-adapter';
import { ApiClientOptions } from '@/types/api-client-options';
import { RequestConfig } from '@/types/request-config';

export class FetchHttpAdapter implements IHttpAdapter<RequestConfig> {
  protected apiUrl: string;

  protected authToken: string;

  constructor(options: ApiClientOptions) {
    this.apiUrl = options.apiUrl || 'https://api.localazy.com';
    this.authToken = options.authToken;
  }

  async get(url: string, config?: RequestConfig): Promise<object | string | Blob> {
    return this.makeRequest('GET', url, config);
  }

  async post(url: string, data: unknown, config?: RequestConfig): Promise<object | string | Blob> {
    return this.makeRequest('POST', url, config, data);
  }

  async put(url: string, data: unknown, config?: RequestConfig): Promise<object | string | Blob> {
    return this.makeRequest('PUT', url, config, data);
  }

  async delete(url: string, config?: RequestConfig): Promise<object | string | Blob> {
    return this.makeRequest('DELETE', url, config);
  }

  protected urlFactory(url: string): string {
    return `${this.apiUrl}${url}`;
  }

  protected configFactory(method: string, config?: RequestConfig, data?: unknown): RequestInit {
    const result: RequestInit = {
      method,
      headers: {
        ...(config?.headers || {}),
        Authorization: `Bearer ${this.authToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      result.body = JSON.stringify(data);
    }

    return result;
  }

  protected async makeRequest(
    method: string,
    url: string,
    config?: RequestConfig,
    data?: unknown,
  ): Promise<object | string | Blob> {
    let resolvedUrl: string = this.urlFactory(url);
    if (method === 'GET' && config?.params) {
      const params: URLSearchParams = new URLSearchParams(config.params);
      resolvedUrl += `?${params.toString()}`;
    }
    const response: Response = await fetch(resolvedUrl, this.configFactory(method, config, data));

    const contentType: string | null = response.headers.get('content-type');
    const isBlob: boolean = config?.responseType === 'blob' || false;
    const isJson: boolean = contentType?.startsWith('application/json') || false;

    let result: string | object | { error: string } | Blob;

    if (isBlob) {
      result = await response.blob();
    } else if (isJson) {
      result = (await response.json()) as object;
    } else {
      result = await response.text();
    }

    if (response.status >= 400) {
      // @ts-expect-error property is not defined on string
      const text: string = isJson && result.error ? result.error : response.statusText;
      throw new Error(`Request failed with status code ${response.status}: ${text}`);
    }

    return result;
  }
}
