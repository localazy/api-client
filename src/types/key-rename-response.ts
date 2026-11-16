/**
 * What a rename did with a key:
 * - `renamed`: the key now has the requested name.
 * - `unchanged`: the key already had the requested name; nothing was touched.
 */
export type KeyRenameState = 'renamed' | 'unchanged';

export type KeyRenameResult = {
  /**
   * Key ID.
   */
  id: string;

  /**
   * The name of the key after the request, as a list of segments.
   */
  key: string[];

  state: KeyRenameState;
};

export type KeyRenameResponse = {
  /**
   * Always `true`; a request that cannot be applied is rejected instead.
   */
  result: boolean;

  /**
   * One entry per requested key, in the order of the request.
   */
  keys: KeyRenameResult[];
};
