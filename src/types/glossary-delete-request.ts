import type { GlossaryRecord } from '@/types/glossary-record.js';
import type { Project } from '@/types/project.js';

export type GlossaryDeleteRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * GlossaryRecord object or GlossaryRecord ID.
   */
  glossaryRecord: GlossaryRecord | string;
};
