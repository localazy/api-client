import type { Branch } from '@/types/branch.js';
import type { Project } from '@/types/project.js';

export type BranchCreateRequest = {
  /**
   * Project object or Project ID of any branch of the project.
   */
  project: Project | string;

  /**
   * Name of the new branch: 2 to 32 characters from `a-z`, `0-9`, `_`, `-` and `.`, not starting
   * with `_` or `-`. `main` is reserved.
   */
  name: string;

  /**
   * Branch to copy, by name or as a Branch object. Defaults to the branch that `project` addresses.
   */
  source?: Branch | Pick<Branch, 'name'> | string;

  /**
   * `true` copies only the settings of the source branch, without its keys and translations.
   * Defaults to `false`: a full copy.
   */
  empty?: boolean;
};
