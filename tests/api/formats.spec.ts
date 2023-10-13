import { Format } from '~/main';

describe('Formats', (): void => {
  test('api.formats.list', async (): Promise<void> => {
    // test
    const formats: Format[] = await api.formats.list();

    // verify
    expect(formats[0].name).toBe('Android XML (from Gradle)');
  });
});
