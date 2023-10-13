import {
  File, I18nJson, Key, Locales,
} from '~/main';

describe('Import', (): void => {
  test('api.import.json', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };

    // test
    const file: File = await api.import.json({ project, json });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });

    // verify
    expect(keys[0].value).toBe('Name');

    // clean
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });
});
