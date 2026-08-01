import type { GlossaryRecordTerm } from '@/types/glossary-record-term.js';
import type { Project } from '@/types/project.js';

export type GlossaryCreateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Description of the glossary term.
   */
  description: string;

  /**
   * Whether the term should be translated or left as is.
   */
  translateTerm: boolean;

  /**
   * Wheter the term is case-sensitive or not.
   */
  caseSensitive: boolean;

  /**
   * Whether the term must match exactly (as opposed to matching any inflected form).
   * Defaults to `true` server-side when omitted.
   */
  exactMatch?: boolean;

  /**
   * Contains an array of the term and it’s translations.
   */
  term: GlossaryRecordTerm[];
};
