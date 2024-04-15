import axios from 'axios';
import fs from 'fs';
import { ApiClient } from '@/api/api-client';

export const readImageFile = (path: string, type: string): string => {
  const img: Buffer = fs.readFileSync(path);
  const base64: string = Buffer.from(img).toString('base64');
  return `data:${type};base64,${base64}`;
};

export const downloadImageFile = async (url: string, type: string): Promise<string> => {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  const base64: string = Buffer.from(data, 'binary').toString('base64');
  return `data:${type};base64,${base64}`;
};

export const textToUint8Array = (text: string): Uint8Array => Buffer.from(text, 'utf-8');

export const getApiClient = (): ApiClient =>
  new ApiClient({
    apiUrl: 'https://api.localazy.com',
    authToken: 'project-token',
  });
