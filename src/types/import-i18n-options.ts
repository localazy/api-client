import { I18nDeprecate } from '@/enums/i18n-deprecate';

export type ImportI18nOptions = {
  /**
   * Import all translations to go through the review process.
   * Useful when you are unsure about their quality and want to do an extra check.
   * Default: false
   */
  importAsNew?: boolean;

  /**
   * Import all translations and set them as the current version.
   * By default, Localazy doesn't overwrite existing current translations and lets you decide through
   * the review process.
   * Default: false
   */
  forceCurrent?: boolean;

  /**
   * Overwrite the source language translations even if there are existing human changes.
   * This option is useful when the source of truth is not Localazy, and it's required to
   * always synchronize the source language translations.
   * Default: false
   */
  forceSource?: boolean;

  /**
   * Do not import translations that are the same as the source language content.
   * Default: true
   */
  filterSource?: boolean;

  /**
   * Tell the server to deprecate any key missing in this upload batch
   * Default: 'none'
   */
  deprecate?: `${I18nDeprecate}`;
};
