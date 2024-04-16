export interface IHttpAdapter<T = object> {
  get: (url: string, config?: T) => Promise<object | string | Blob>;
  post: (url: string, data: unknown, config?: T) => Promise<object | string | Blob>;
  put: (url: string, data: unknown, config?: T) => Promise<object | string | Blob>;
  delete: (url: string, config?: T) => Promise<object | string | Blob>;
}
