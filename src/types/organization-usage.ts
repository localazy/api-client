import type { CreditBalance } from '@/types/credit-balance.js';

export type OrganizationKeysUsage = {
  /**
   * Source keys counted against the quota.
   */
  used: number;

  /**
   * Source key quota, including active temporary increases.
   */
  limit: number;

  /**
   * `limit` minus `used`. Negative when the organization is over its quota.
   */
  remaining: number;
};

export type OrganizationUsage = {
  /**
   * The billing organization the figures belong to. For a team, this is its parent organization.
   */
  organizationId: string;

  keys: OrganizationKeysUsage;

  credits: CreditBalance;
};
