/**
 * - `generic`: a normal tag.
 * - `file`: a tag that also defines an additional output file for the keys that have it.
 */
export type ProjectTagType = 'generic' | 'file';

export type ProjectTag = {
  /**
   * Tag ID, as reported in the tags of a key.
   */
  id: string;

  /**
   * Tag name; keys are tagged by name with `keys.setTags()`.
   */
  name: string;

  type: ProjectTagType;

  /**
   * `true` for a tag that Localazy defines for each project: the four priority tags and the tags it
   * sets on translations (such as `Translated by MT`).
   */
  builtIn: boolean;
};
