import type { FormatArrayMeta } from '@/types/format-array-meta.js';
import type { FormatKeyTransformerMeta } from '@/types/format-key-transformer-meta.js';
import type { FormatPluralMeta } from '@/types/format-plural-meta.js';

export type Format = {
  type: string;
  name: string;
  supportStrings: boolean;
  supportPlurals: boolean;
  supportArrays: boolean;
  supportStructuredKeys: boolean;
  plurals?: FormatPluralMeta[];
  arrays?: FormatArrayMeta[];
  keyTransformers?: FormatKeyTransformerMeta[];
};
