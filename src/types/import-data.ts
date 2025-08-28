import type { ImportDataFile } from '@/types/import-data-file.js';
import type { ImportI18nOptions } from '@/types/import-i18n-options.js';

export type ImportData = ImportI18nOptions & {
  files: ImportDataFile[];
};
