import {
  File, I18nJson, Key, Locales,
} from '~/main';

describe('Keys', (): void => {
  test('api.keys.update', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    const file: File = await api.import.json({ project, json });
    const keys: Key[] = await api.files.listKeys({
      project, file, lang: Locales.ENGLISH, extra_info: true,
    });

    // test
    await api.keys.update({ project, key: keys[0], comment: 'Comment for translators.' });

    // verify
    const updatedKeys: Key[] = await api.files.listKeys({
      project, file, lang: Locales.ENGLISH, extra_info: true,
    });
    expect(updatedKeys[0].comment).toBe('Comment for translators.');

    // clean
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.keys.delete', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    const file: File = await api.import.json({ project, json });
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });

    // test
    await api.keys.delete({ project, key: keys[0] });

    // verify
    const updatedKeys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    expect(updatedKeys.length).toBe(0);
  });
});
