import { ApiClient } from '@/api/api-client';
import fs from 'node:fs';

export const readImageFile = (path: string, type: string): string => {
  const img: Buffer = fs.readFileSync(path);
  const base64: string = Buffer.from(img).toString('base64');
  return `data:${type};base64,${base64}`;
};

export const textToUint8Array = (text: string): Uint8Array => Buffer.from(text, 'utf-8');

export const getToken = (): string => 'project-token';

export const getApiUrl = (): string => 'https://api.localazy.com';

export const getApiClient = (): ApiClient =>
  new ApiClient({
    apiUrl: getApiUrl(),
    authToken: getToken(),
  });
