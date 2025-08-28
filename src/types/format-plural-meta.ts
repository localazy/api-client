import type { FormatPluralMetaRequiredParam } from '@/types/format-plural-meta-required-param.js';

export type FormatPluralMeta = {
  type: string;
  name: string;
  isDefault: boolean;
  requiredParams?: FormatPluralMetaRequiredParam[];
};
