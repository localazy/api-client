import {
  File, I18nJson, Key, Locales,
} from '~/main';

describe('Export', (): void => {
  test('api.export.json | nested keys', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    const file: File = await api.import.json({ project, json });

    // test
    const jsonExport: I18nJson = await api.export.json({
      project,
      file,
      langs: [Locales.ENGLISH],
      nestedKeys: true,
    });

    // verify
    expect(jsonExport.en.headers.name).toBe('Name');

    // clean
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.export.json | flat keys', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { 'headers.name': 'Name' } };
    const file: File = await api.import.json({ project, json });

    // test
    const jsonExport: I18nJson = await api.export.json({
      project,
      file,
      langs: [Locales.ENGLISH],
      nestedKeys: false,
    });

    // verify
    expect(jsonExport.en['headers.name']).toBe('Name');

    // clean
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });
});
