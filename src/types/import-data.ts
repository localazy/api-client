import type { ImportDataFile } from '@/types/import-data-file';
import type { ImportI18nOptions } from '@/types/import-i18n-options';

export type ImportData = ImportI18nOptions & {
  files: ImportDataFile[];
};
