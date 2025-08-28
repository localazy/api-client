import type { I18nJson } from '@/types/i18n-json';
import type { ImportContentOptions } from '@/types/import-content-options';
import type { ImportFileOptions } from '@/types/import-file-options';
import type { ImportI18nOptions } from '@/types/import-i18n-options';
import type { Project } from '@/types/project';

export type ImportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  json: I18nJson;

  i18nOptions?: ImportI18nOptions;

  fileOptions?: ImportFileOptions;

  contentOptions?: ImportContentOptions;
};
