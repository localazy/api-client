import type { I18nJson } from '@/types/i18n-json';
import type { ImportContentOptions } from '@/types/import-content-options';
import type { ImportFileOptions } from '@/types/import-file-options';

export type ImportDataFile = ImportFileOptions & { content: ImportContentOptions & I18nJson };
