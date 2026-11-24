import type { ProjectTone } from '@/enums/project-tone.js';
import type { ProjectType } from '@/enums/project-type.js';
import type { Locales } from '@localazy/languages';

export type ProjectCreateRequest = {
  /**
   * Project name, 1 to 64 characters and not blank.
   */
  name: string;

  /**
   * Project slug. Generated from the name when omitted.
   */
  slug?: string;

  /**
   * Source language of the project as a locale code or Localazy's numeric language id, such as
   * `Project.sourceLanguage`. Default `en`.
   */
  sourceLanguage?: `${Locales}` | number;

  /**
   * Project visibility. Default `restricted`.
   */
  type?: `${ProjectType}`;

  /**
   * Preferred translation tone. Default `not_specified`.
   */
  tone?: `${ProjectTone}`;

  /**
   * Project description, at most 1000 characters.
   */
  description?: string;

  /**
   * Whether Localazy ShareTM is enabled for the project. Default `true`.
   */
  useShareTm?: boolean;
};
