import type { AiTranslateResponseItem } from '@/types/ai-translate-response-item.js';

export type AiTranslateResponse = {
  /**
   * true if the translation was successful, false otherwise.
   */
  result: boolean;

  /**
   * Error message. Only present when result is false.
   */
  message?: string;

  /**
   * Array of translated items. Only present when result is true.
   */
  items?: AiTranslateResponseItem[];
};
