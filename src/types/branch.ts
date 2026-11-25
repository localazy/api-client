/**
 * One branch of a project. Each branch is a project of its own, with its own ID, tokens and members.
 */
export type Branch = {
  /**
   * Branch name. The main branch is always `main`; the other branch endpoints address branches by
   * this name.
   */
  name: string;

  /**
   * ID of the project that holds the content of the branch. Pass it as `project` to the other
   * endpoints to read or change keys, translations and files of the branch.
   */
  projectId: string;

  /**
   * Slug of the branch project, e.g. `mobile-app!release-2`.
   */
  slug: string;

  /**
   * `true` for the main branch.
   */
  main: boolean;

  /**
   * Name of the branch this branch was made from. Absent for the main branch.
   */
  source?: string;
};
