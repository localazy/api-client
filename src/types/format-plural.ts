import { Format } from '~/types/format';
import { FormatPluralMeta } from '~/types/format-plural-meta';

export type FormatPlural = Format & {
  supportPlurals: true;
  plurals: FormatPluralMeta[];
};
