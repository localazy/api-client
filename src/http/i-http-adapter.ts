import { AxiosRequestConfig } from 'axios';

export interface IHttpAdapter {
  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;

  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;

  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
}
