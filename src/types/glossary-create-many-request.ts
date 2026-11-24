import type { GlossaryRecordTerm } from '@/types/glossary-record-term.js';
import type { Project } from '@/types/project.js';

/**
 * One term of a batch. An omitted option keeps the existing value when the item merges into an
 * existing term, and takes the server default when a new term is created.
 */
export type GlossaryCreateManyItem = {
  /**
   * The term and its translations. Include the source language: it identifies duplicates.
   */
  term: GlossaryRecordTerm[];

  /**
   * Defaults to `''` for a new term.
   */
  description?: string;

  /**
   * Defaults to `true` for a new term.
   */
  translateTerm?: boolean;

  /**
   * Defaults to `false` for a new term; when omitted, duplicates are matched case-insensitively.
   */
  caseSensitive?: boolean;

  /**
   * Defaults to `true` for a new term; when omitted, an existing term with either value matches.
   */
  exactMatch?: boolean;
};

export type GlossaryCreateManyRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  terms: GlossaryCreateManyItem[];
};
