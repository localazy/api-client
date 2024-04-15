import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import { ApiClient, Format } from '@/main';

describe('Formats', (): void => {
  let api: ApiClient;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
  });

  test('api.formats.list', async (): Promise<void> => {
    const formats: Format[] = await api.formats.list();

    expect(formats[0].name).toBe('Android XML (from Gradle)');
  });
});
