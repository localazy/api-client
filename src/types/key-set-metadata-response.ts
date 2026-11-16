/**
 * What a metadata change did with a key:
 * - `updated`: the change was applied.
 * - `not_found`: the key does not exist, is deleted, or does not belong to the project; nothing changed.
 * - `not_supported`: the ID is cluster-qualified (`keyId:clusterKeyId`) or names a single segment of a
 *   segmented key; nothing changed.
 */
export type KeyMetadataState = 'updated' | 'not_found' | 'not_supported';

export type KeyMetadataResult = {
  /**
   * Key ID, as sent.
   */
  id: string;

  state: KeyMetadataState;
};

export type KeySetMetadataResponse = {
  /**
   * Always `true`; a request that cannot be applied at all is rejected instead.
   */
  result: boolean;

  /**
   * One entry per requested key, in the order of the request.
   */
  keys: KeyMetadataResult[];
};
