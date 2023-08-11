import fs from 'fs';
import axios from 'axios';

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
