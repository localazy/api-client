import { Key } from '~/types/key';
import { Project } from '~/types/project';

export type KeyDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Key object or Key ID.
   */
  key: Key | string;
};
