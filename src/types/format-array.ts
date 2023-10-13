import { Format } from '~/types/format';
import { FormatArrayMeta } from '~/types/format-array-meta';

export type FormatArray = Format & {
  supportArrays: true;
  arrays: FormatArrayMeta[];
};
