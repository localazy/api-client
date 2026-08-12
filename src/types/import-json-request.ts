import type { I18nJson } from '@/types/i18n-json.js';
import type { ImportContentOptions } from '@/types/import-content-options.js';
import type { ImportFileOptions } from '@/types/import-file-options.js';
import type { ImportI18nOptions } from '@/types/import-i18n-options.js';
import type { Project } from '@/types/project.js';

export type ImportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The content to import, keyed by locale.
   *
   * **Plural keys need `@`-prefixed CLDR classes** — `{ ITEMS: { '@one': '%d
   * item', '@other': '%d items' } }`. The prefix is what distinguishes a plural
   * from a nested key group: without it, `{ ITEMS: { one: '…', other: '…' } }`
   * silently creates two nested keys `ITEMS.one` and `ITEMS.other` instead, and
   * neither the API nor the type system reports a problem, because declaring
   * nested keys that way is legitimate.
   *
   * Note this differs from `keys.submitTranslation`, which takes plain classes
   * because the key it targets is already identified in the URL.
   */
  json: I18nJson;

  i18nOptions?: ImportI18nOptions;

  fileOptions?: ImportFileOptions;

  contentOptions?: ImportContentOptions;
};
