import { Locales } from '@localazy/languages';

export type GlossaryRecordTerm = {
  /**
   * Language code in which the term is used. Make sure to include source language.
   */
  lang: `${Locales}`;

  /**
   * The value of the glossary term.
   */
  term: string;
};
