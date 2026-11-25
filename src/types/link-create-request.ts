import type { Key } from '@/types/key.js';
import type { Project } from '@/types/project.js';

export type LinkCreateRequest = {
  /**
   * Project object or Project ID of the key to link.
   */
  project: Project | string;

  /**
   * Key object or Key ID of the key to link. It becomes hidden and publishes the content of
   * `linkedKey` while the link exists.
   */
  key: Key | string;

  /**
   * Key object or Key ID of the target key.
   */
  linkedKey: Key | string;

  /**
   * Project object, Project ID or slug of the target key's project. Defaults to `project`.
   */
  linkedProject?: Project | string;
};
