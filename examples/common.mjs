/**
 * This file contains utilities used by examples in other *.mjs files.
 */

import 'dotenv/config';
import fs from 'fs';

export const getConfig = () => {
  const authToken = process.env.LOCALAZY_API_AUTH_TOKEN || '';
  const apiUrl = process.env.LOCALAZY_API_URL || '';

  if (!authToken || !apiUrl) {
    console.error('Missing ENV variables.');
    process.exit(1);
  }

  return { authToken, apiUrl };
};

export const readImageFile = (path, type) => {
  const img = fs.readFileSync(path);
  const base64 = Buffer.from(img).toString('base64');
  return `data:${type};base64,${base64}`;
};
