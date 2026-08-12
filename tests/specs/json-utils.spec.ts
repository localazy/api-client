import { JsonUtils, encodePluralMarkers, plural } from '@/main.js';
import { describe, expect, test } from 'vitest';

describe('JsonUtils chunking', (): void => {
  test('keeps a plural key atomic instead of one leaf per class', (): void => {
    const json = encodePluralMarkers({
      en: { A: 'x', ITEMS: plural({ one: '%d item', other: '%d items' }), B: 'y' },
    });

    // Each class used to become its own leaf, which meant a plural could be
    // split across two chunks and uploaded as two separate files.
    const chunks = JsonUtils.slice(json);

    expect(chunks).toHaveLength(1);
    expect(chunks[0]?.en.ITEMS).toEqual({ '@one': '%d item', '@other': '%d items' });
  });

  test('still recurses into ordinary nested objects', (): void => {
    const chunks = JsonUtils.slice({ en: { nested: { deep: { key: 'v' } }, TITLE: 'Hello' } });

    expect(chunks[0]?.en.nested).toEqual({ deep: { key: 'v' } });
    expect(chunks[0]?.en.TITLE).toBe('Hello');
  });

  test('folds a payload at the chunk limit without overflowing the stack', (): void => {
    const en: Record<string, unknown> = {};
    for (let i = 0; i < JsonUtils.CHUNK_LIMIT + 500; i++) {
      en[`F${String(i).padStart(6, '0')}`] = `v${i}`;
    }

    // mergeChunkValues used to spread one argument per leaf, so a payload of
    // this size threw RangeError before any request was sent.
    const chunks = JsonUtils.slice({ en });
    const total: number = chunks.reduce(
      (n: number, c): number => n + Object.keys(c.en as object).length,
      0,
    );

    expect(chunks.length).toBeGreaterThan(1);
    expect(total).toBe(JsonUtils.CHUNK_LIMIT + 500);
  });

  test('keeps a plural intact across a real chunk split', (): void => {
    const en: Record<string, unknown> = {};
    for (let i = 0; i < JsonUtils.CHUNK_LIMIT + 500; i++) {
      en[`F${String(i).padStart(6, '0')}`] = `v${i}`;
    }
    en[`F${String(JsonUtils.CHUNK_LIMIT - 1).padStart(6, '0')}_PLURAL`] = plural({
      one: '%d item',
      other: '%d items',
    });

    const chunks = JsonUtils.slice(encodePluralMarkers({ en }));
    const holding = chunks.filter((c) =>
      Object.keys(c.en as object).some((k: string): boolean => k.endsWith('_PLURAL')),
    );

    expect(holding).toHaveLength(1);
    const bucket = holding[0]?.en as Record<string, Record<string, string>>;
    const key = Object.keys(bucket).find((k: string): boolean => k.endsWith('_PLURAL')) ?? '';
    expect(bucket[key]).toEqual({ '@one': '%d item', '@other': '%d items' });
  });
});
