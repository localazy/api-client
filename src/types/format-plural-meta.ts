import { FormatPluralMetaRequiredParam } from '@/types/format-plural-meta-required-param';

export type FormatPluralMeta = {
  type: string;
  name: string;
  isDefault: boolean;
  requiredParams?: FormatPluralMetaRequiredParam[];
};
