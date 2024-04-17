export type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  responseType?: 'json' | 'text' | 'blob';
};
