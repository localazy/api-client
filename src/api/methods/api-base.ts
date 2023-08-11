import { ApiClient } from '~/api/api-client';

export abstract class ApiBase {
  protected api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  protected static getId(val: string | { id: string }, prop: string): string {
    const id: string = typeof val === 'string' ? val : (val?.id || '');

    if (!id) {
      throw new Error(`Invalid ${prop} ID.`);
    }

    return id;
  }
}
