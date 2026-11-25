import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { TranslationValue } from '@/types/translation-value.js';

export type KeyEditSourceRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;

  /**
   * The new source text. Its shape must match the key's form, as for `keys.submitTranslation()`;
   * a plural value needs an entry for each plural class of the source language.
   */
  value: TranslationValue;

  /**
   * Whether translations get the `sourceChanged` state when the new text becomes current and
   * differs. Defaults to `true`; pass `false` for a change that doesn't affect meaning, like a typo.
   */
  sourceChanged?: boolean;
};
