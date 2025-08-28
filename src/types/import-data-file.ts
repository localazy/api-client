import type { I18nJson } from '@/types/i18n-json.js';
import type { ImportContentOptions } from '@/types/import-content-options.js';
import type { ImportFileOptions } from '@/types/import-file-options.js';

export type ImportDataFile = ImportFileOptions & { content: ImportContentOptions & I18nJson };
