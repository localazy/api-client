import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type SegmentationGetParentRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * The parent ID (`segParentId` of a segment) or the parent handle (the ID of a segmented key in
   * the default mode of `files.listKeys()`). A deprecated parent is addressable only by its parent
   * ID.
   */
  parent: Key | string;

  /**
   * Language to reassemble the text in, as a locale code (e.g. `pt_BR`); numeric language ids are
   * not accepted.
   */
  lang: `${Locales}`;
};
