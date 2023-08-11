import { GlossaryCreateRequest, GlossaryRecord } from '~/main';

describe('Glossary', (): void => {
  test('api.glossary.list', async (): Promise<void> => {
    // prepare
    const createData: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Exceptional term' },
      ],
    };
    const recordId: string = await api.glossary.create({ project, ...createData });

    // test
    const records: GlossaryRecord[] = await api.glossary.list({ project });

    // verify
    expect(records[0].description).toBe('Exceptional term description');

    // clean
    await api.glossary.delete({ project, glossaryRecord: recordId });
  });

  test('api.glossary.find', async (): Promise<void> => {
    // prepare
    const createData: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Exceptional term' },
      ],
    };
    const recordId: string = await api.glossary.create({ project, ...createData });

    // test
    const record: GlossaryRecord = await api.glossary.find({ project, glossaryRecord: recordId });

    // verify
    expect(record.description).toBe('Exceptional term description');

    // clean
    await api.glossary.delete({ project, glossaryRecord: recordId });
  });

  test('api.glossary.create', async (): Promise<void> => {
    // prepare
    const createData: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Exceptional term' },
      ],
    };

    // test
    const recordId: string = await api.glossary.create({ project, ...createData });

    // verify
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const recordExists: boolean = records.some((i: GlossaryRecord): boolean => i.id === recordId);
    expect(recordExists).toBe(true);

    // clean
    await api.glossary.delete({ project, glossaryRecord: recordId });
  });

  test('api.glossary.update', async (): Promise<void> => {
    // prepare
    const createData: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Exceptional term' },
      ],
    };
    const updateData: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Updated term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Updated term' },
      ],
    };
    const recordId: string = await api.glossary.create({ project, ...createData });
    const glossaryRecord: GlossaryRecord = await api.glossary.find({ project, glossaryRecord: recordId });

    // test
    await api.glossary.update({ project, glossaryRecord, ...updateData });

    // verify
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const record: GlossaryRecord | undefined = records.find((i: GlossaryRecord): boolean => i.id === recordId);
    expect(record?.description).toBe('Updated term description');

    // clean
    await api.glossary.delete({ project, glossaryRecord: recordId });
  });

  test('api.glossary.delete', async (): Promise<void> => {
    // prepare
    const data: Omit<GlossaryCreateRequest, 'project'> = {
      description: 'Exceptional term description',
      caseSensitive: true,
      translateTerm: true,
      term: [
        { lang: 'en', term: 'Exceptional term' },
      ],
    };
    const recordId: string = await api.glossary.create({ project, ...data });
    const glossaryRecord: GlossaryRecord = await api.glossary.find({ project, glossaryRecord: recordId });

    // test
    await api.glossary.delete({ project, glossaryRecord });

    // verify
    const records: GlossaryRecord[] = await api.glossary.list({ project });
    const recordExists: boolean = records.some((i: GlossaryRecord): boolean => i.id === recordId);
    expect(recordExists).toBe(false);
  });
});
