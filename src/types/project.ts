import { ProjectTone } from '~/enums/project-tone';
import { ProjectType } from '~/enums/project-type';
import { UserRole } from '~/enums/user-role';
import { Language } from '~/types/language';
import { Organization } from '~/types/organization';

export type Project = {
  /**
   * Unique project identifier.
   */
  id: string;

  /**
   * Identifier of the organization the project belongs to.
   */
  orgId: string;

  /**
   * Project name.
   */
  name: string;

  /**
   * Project slug.
   */
  slug: string;

  /**
   * Full URL to the project image or empty string if there is no image available.
   */
  image: string;

  /**
   * Full URL to the project on Localazy.
   */
  url: string;

  /**
   * Project description.
   */
  description: string;

  /**
   * Project type.
   */
  type: `${ProjectType}`;

  /**
   * Project tone.
   */
  tone: `${ProjectTone}`;

  /**
   * Role of the current user accessing API (based on the token).
   */
  role: `${UserRole}`;

  /**
   * The identifier of the source language of the project.
   */
  sourceLanguage: number;

  /**
   * List of enabled features and available source keys.
   * Only available if the organization query parameter is set to true.
   */
  organization: Organization;

  /**
   * List of all languages and their current state. Only available if the languages query parameter is set to true.
   */
  languages: Language[];
};
