import type { ApiClient, Project } from '@/main.js';
import { JsonUtils, PLURAL_CLASSES, encodePluralMarkers, plural } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { getApiClient } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Plural helper', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('import renders plural() with the @ prefix', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.import.json({
      project,
      json: { en: { ITEMS: plural({ one: '%d item', other: '%d items' }) } },
    });

    const body: string = String(spy.mock.calls[0]?.[1]?.body);
    // On import the prefix is what marks a plural rather than a nested key group.
    expect(body).toContain('"@one":"%d item"');
    expect(body).toContain('"@other":"%d items"');
    // The marker itself must never reach the wire.
    expect(body).not.toContain('__localazyPlural');
    expect(body).not.toContain('"forms"');
  });

  test('import leaves an unmarked object as nested keys', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.import.json({
      project,
      json: { en: { ITEMS: { one: '%d item', other: '%d items' } } },
    });

    const body: string = String(spy.mock.calls[0]?.[1]?.body);
    // Unmarked objects are legitimate nesting, so the client must not add '@'.
    expect(body).toContain('"one":"%d item"');
    expect(body).not.toContain('"@one"');
  });

  test('import preserves surrounding content and arrays', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.import.json({
      project,
      json: {
        en: {
          TITLE: 'Hello',
          ROLES: ['Admin', 'Editor'],
          ITEMS: plural({ one: '%d item', other: '%d items' }),
        },
      },
    });

    const body: string = String(spy.mock.calls[0]?.[1]?.body);
    expect(body).toContain('"TITLE":"Hello"');
    expect(body).toContain('"Admin"');
    expect(body).toContain('"@one":"%d item"');
  });
  test('markers are resolved before the payload is chunked', (): void => {
    const json = {
      en: {
        TITLE: 'Hello',
        ROLES: ['Admin', 'Editor'],
        ITEMS: plural({ one: '%d item', other: '%d items' }),
        CZ: plural({ one: '1', few: '2', many: '3', other: '4' }),
        NESTED: { one: 'nested one', other: 'nested other' },
      },
    };

    // The chunker recurses into every plain object, so an unresolved marker
    // would be split across leaves and rebuilt into the request verbatim.
    // Encoding must therefore happen first, exactly as api.import.json does it.
    const chunks = JsonUtils.slice(encodePluralMarkers(json));
    const en = chunks[0]?.en;

    expect(JSON.stringify(chunks)).not.toContain('__localazyPlural');
    expect(en.ITEMS).toEqual({ '@one': '%d item', '@other': '%d items' });
    // Multi-class plurals survive slicing even though each class is its own leaf.
    expect(Object.keys(en.CZ)).toEqual(['@one', '@few', '@many', '@other']);
    // Unmarked objects are legitimate nesting and must not gain a prefix.
    expect(en.NESTED).toEqual({ one: 'nested one', other: 'nested other' });
    expect(en.ROLES).toEqual(['Admin', 'Editor']);
    expect(en.TITLE).toBe('Hello');
  });
  test.each([...PLURAL_CLASSES])('recognises "%s" as a plural class end to end', (cls): void => {
    // Iterates PLURAL_CLASSES itself, so a class added to the list is covered
    // automatically and cannot be left behind by the runtime check.
    const json = encodePluralMarkers({ en: { ITEMS: plural({ [cls]: 'text' }) } });
    const chunks = JsonUtils.slice(json);

    // Prefixed on the wire, and kept whole rather than split per class.
    expect(chunks[0]?.en.ITEMS).toEqual({ [`@${cls}`]: 'text' });
  });
});
