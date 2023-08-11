import { I18nJson } from '~/types/i18n-json';
import { ImportContentOptions } from '~/types/import-content-options';
import { ImportFileOptions } from '~/types/import-file-options';

export type ImportDataFile = ImportFileOptions & { content: ImportContentOptions & I18nJson };
