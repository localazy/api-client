import type { TranslationValue } from '@/types/translation-value.js';
import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type KeySubmitTranslationRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * The target language the translation is submitted for, as a locale code
   * (e.g. `pt_BR`) or Localazy's numeric language id (e.g. `112`).
   */
  lang: `${Locales}` | number;

  /**
   * The translation value. Its shape must match the key's form:
   * a string for a singular key (`'Save'`), an array of strings for an array
   * key (`['First', 'Second']`), or an object keyed by CLDR plural class for a
   * plural key (`{ one: '1 item', other: '%d items' }`).
   *
   * The `@`-prefixed plural form returned by the read API
   * (`{ '@one': '1 item' }`) is also accepted — the prefix is stripped before
   * the request is sent.
   */
  value: TranslationValue;
};
