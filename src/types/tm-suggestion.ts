/**
 * Lightweight identification of the project that holds the matching phrase
 * (almost always the current project).
 */
export type TmSuggestionProject = {
  /**
   * Project identifier.
   */
  id: string;

  /**
   * Project name.
   */
  name: string;

  /**
   * Absolute URL of the project image.
   */
  image: string;

  /**
   * Path to the project, relative to the Localazy site root (e.g. `/p/my-app`).
   */
  url: string;
};

/**
 * A Translation Memory suggestion: a translation reused from another phrase
 * in the project.
 */
export type TmSuggestion = {
  /**
   * The suggested translation value.
   */
  value: string;

  /**
   * Identifier of the key (phrase) the translation was reused from.
   */
  phraseId: string;

  /**
   * The project that holds the matching phrase.
   */
  project: TmSuggestionProject;
};
