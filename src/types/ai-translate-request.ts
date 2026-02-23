import type { AiTranslateItem } from '@/types/ai-translate-item.js';
import type { Project } from '@/types/project.js';

export type AiTranslateRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * Source locale code (e.g. en, cs, de).
   */
  from: string;

  /**
   * Target locale code (e.g. cs, de, ja).
   */
  to: string;

  /**
   * Array of items to translate.
   */
  items: AiTranslateItem[];

  /**
   * Fallback machine translation engine to use when Localazy AI is unavailable.
   * Supported engines: "google", "deepl".
   */
  fallback?: 'google' | 'deepl';
};
