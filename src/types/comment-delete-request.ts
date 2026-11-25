import type { KeyComment } from '@/types/key-comment.js';
import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';
import type { Locales } from '@localazy/languages';

export type CommentDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID; must be the key of the comment.
   */
  key: Key | string;

  /**
   * The language of the comment, as a locale code or Localazy's numeric language id.
   */
  lang: `${Locales}` | number;

  /**
   * Comment object or Comment ID.
   */
  comment: KeyComment | string;
};
