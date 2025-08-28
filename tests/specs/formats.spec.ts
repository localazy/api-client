import type { ApiClient, Format } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient } from '@tests/support/index.js';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Formats', (): void => {
  let api: ApiClient;

  beforeEach((): void => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.formats.list', async (): Promise<void> => {
    const formats: Format[] = await api.formats.list();

    const fmt = assertNotNull(formats[0]);
    expect(fmt.name).toBe('Android XML (from Gradle)');
  });
});
