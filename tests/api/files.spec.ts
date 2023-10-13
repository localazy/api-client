import {
  File, FileListKeysRequest, I18nJson, Key, KeysPaginated, Locales,
} from '~/main';

describe('Files', (): void => {
  test('api.files.list', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    await api.import.json({ project, json });

    // test
    const files: File[] = await api.files.list({ project });

    // verify
    expect(files[0].name).toBe('content.json');

    // clean
    const keys: Key[] = await api.files.listKeys({ project, file: files[0], lang: Locales.ENGLISH });
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.files.first', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    await api.import.json({ project, json });

    // test
    const file: File = await api.files.first({ project });

    // verify
    expect(file.name).toBe('content.json');

    // clean
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.files.first | file not found', async (): Promise<void> => {
    // prepare
    let message: string | undefined;

    // test
    try {
      await api.files.first({ project });
    } catch (err: any) {
      message = err.message;
    }

    // verify
    expect(message).toBe('File not found.');
  });

  test('api.files.listKeys', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    const file: File = await api.import.json({ project, json });

    // test
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });

    // verify
    expect(keys[0].value).toBe('Name');

    // clean
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.files.listKeysPage', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name', users: 'Users', company: 'Company' } } };
    const file: File = await api.import.json({ project, json });
    const request: FileListKeysRequest = {
      project, file, lang: Locales.ENGLISH, limit: 1,
    };

    // test
    const keys: Key[] = [];
    let counter: number = 0;
    let pageResult: KeysPaginated = {
      keys: [],
      next: '',
    };

    do {
      counter += 1;
      // eslint-disable-next-line no-await-in-loop
      pageResult = await api.files.listKeysPage({ ...request, next: pageResult.next });
      keys.push(...pageResult.keys);
    } while (pageResult.next);

    // verify
    expect(keys.length).toBe(3);
    expect(counter).toBe(3);

    // clean
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });

  test('api.files.getContents', async (): Promise<void> => {
    // prepare
    const json: I18nJson = { en: { headers: { name: 'Name' } } };
    const file: File = await api.import.json({ project, json });

    // test
    const blob: Blob = await api.files.getContents({ project, file, lang: Locales.ENGLISH });
    const content: string = await blob.text();

    // verify
    expect(content).toBe(`{
  "headers": {
    "name": "Name"
  }
}`);

    // clean
    const keys: Key[] = await api.files.listKeys({ project, file, lang: Locales.ENGLISH });
    await Promise.all(keys.map((key: Key): Promise<void> => api.keys.delete({ project, key })));
  });
});
