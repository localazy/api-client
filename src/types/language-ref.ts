import type { Locales } from '@localazy/languages';

/**
 * A language as a locale code (`pt_BR`; `pt-BR` is accepted too) or Localazy's numeric language id
 * (`112`). An unknown region falls back to the plain language, so `pt-XX` resolves to `pt`.
 */
export type LanguageRef = `${Locales}` | (string & Record<never, never>) | number;
