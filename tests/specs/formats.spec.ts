import { ApiClient, Format } from '@/main';
import { fullProject } from '@tests/fixtures';
import { getApiClient } from '@tests/support';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Formats', (): void => {
  let api: ApiClient;

  beforeEach((): void => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.formats.list', async (): Promise<void> => {
    const formats: Format[] = await api.formats.list();

    expect(formats[0].name).toBe('Android XML (from Gradle)');
  });
});
