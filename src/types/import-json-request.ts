import { I18nJson } from '~/types/i18n-json';
import { ImportContentOptions } from '~/types/import-content-options';
import { ImportFileOptions } from '~/types/import-file-options';
import { ImportI18nOptions } from '~/types/import-i18n-options';
import { Project } from '~/types/project';

export type ImportJsonRequest = {
  /**
   * Project object or Project ID.
   */
  project: Project | string;

  /**
   * TODO docs
   */
  json: I18nJson;

  /**
   * TODO docs
   */
  i18nOptions?: ImportI18nOptions;

  /**
   * TODO docs
   */
  fileOptions?: ImportFileOptions;

  /**
   * TODO docs
   */
  contentOptions?: ImportContentOptions;
};
