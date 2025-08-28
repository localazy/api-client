import type { I18nJson } from '@/types/i18n-json';
import type { ImportData } from '@/types/import-data';
import type { ImportDataFile } from '@/types/import-data-file';
import type { ImportJsonRequest } from '@/types/import-json-request';

export const importDataFactory = (request: ImportJsonRequest, chunks: I18nJson[]): ImportData => ({
  ...request.i18nOptions,
  files: [
    ...chunks.map(
      (chunk: I18nJson): ImportDataFile => ({
        name: 'content.json',
        ...request.fileOptions,
        content: {
          type: 'json',
          ...request.contentOptions,
          ...chunk,
        },
      }),
    ),
  ],
});
