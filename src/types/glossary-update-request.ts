import { GlossaryRecord } from '@/types/glossary-record';
import { GlossaryRecordTerm } from '@/types/glossary-record-term';
import { Project } from '@/types/project';

export type GlossaryUpdateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * GlossaryRecord object or GlossaryRecord ID.
   */
  glossaryRecord: GlossaryRecord | string;

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
   * Contains an array of the term and it’s translations.
   */
  term: GlossaryRecordTerm[];
};
