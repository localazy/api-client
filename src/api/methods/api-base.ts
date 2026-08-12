import type { ApiClient } from '@/api/api-client.js';

export abstract class ApiBase {
  protected api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  protected static getId(val: string | { id: string }, prop: string): string {
    const id: string = typeof val === 'string' ? val : val.id || '';

    if (!id) {
      throw new Error(`Invalid ${prop} ID.`);
    }

    return id;
  }

  /**
   * Validates a required language and renders it as a string. Guards against a
   * nullish value being coerced to the literal `"null"` / `"undefined"`, which
   * the API would reject as an unknown language rather than as a missing one.
   */
  protected static requireLang(val: string | number | null | undefined, prop: string): string {
    if (val === undefined || val === null || String(val).trim() === '') {
      throw new Error(`Invalid ${prop} language.`);
    }

    return String(val);
  }

  protected static getIds(vals: (string | { id: string })[], prop: string): string[] {
    if (!Array.isArray(vals)) {
      throw new TypeError(`Invalid ${prop} list: an array is required.`);
    }

    return vals.map((val: string | { id: string }): string => ApiBase.getId(val, prop));
  }
}
