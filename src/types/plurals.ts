import type { PluralClass } from '@/types/plural-class.js';

export type PluralRule = {
  /**
   * Language code of the rule, e.g. `fr` or `fr_CA`.
   */
  language: string;

  /**
   * `true` when the rule applies to this locale only; `false` when it applies to all variants of the
   * language.
   */
  exact: boolean;

  forms: PluralClass[];
};

export type PluralSamples = {
  /**
   * Example integers in CLDR notation, e.g. `2~4`.
   */
  integer?: string;

  /**
   * Example decimals in CLDR notation.
   */
  decimal?: string;
};

export type PluralLanguageForms = {
  /**
   * Language code, as in `Language.code`.
   */
  lang: string;

  /**
   * The plural forms the language uses in the project, ordered `zero`, `one`, `two`, `few`, `many`,
   * `other`.
   */
  forms: PluralClass[];

  /**
   * `true` when a rule of the project gives the forms instead of CLDR.
   */
  override: boolean;

  /**
   * Example numbers for each form. Absent when `override` is `true`.
   */
  samples?: Partial<Record<PluralClass, PluralSamples>>;
};

export type Plurals = {
  /**
   * Plural rules the project defines in place of the standard ones. Empty when none.
   */
  rules: PluralRule[];

  /**
   * One entry per project language; the source language is first.
   */
  languages: PluralLanguageForms[];
};
