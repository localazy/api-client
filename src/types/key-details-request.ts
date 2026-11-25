import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type KeyDetailsRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Keys to read, 1 to 100 per call. A cluster-qualified ID (`keyId:clusterKeyId`) is accepted; the
   * cluster part is ignored.
   */
  keys: (Key | Pick<Key, 'id'> | string)[];

  /**
   * The language of the translation, as a locale code (e.g. `pt_BR`) or Localazy's numeric language
   * id (e.g. `112`). For the source language, `translation` describes the source text.
   */
  lang: `${Locales}` | number;
};
