import type { CreditBalance } from '@/types/credit-balance.js';
import type { CreditCategory, CreditSource } from '@/types/credit-transactions.js';

/**
 * Consumption of one group. Only the keys requested in `groupBy` are present, and a key without a
 * value (e.g. `projectId` of a `system` cost) is omitted.
 */
export type CreditSummaryGroup = {
  /**
   * UTC day, `YYYY-MM-DD`.
   */
  day?: string;

  /**
   * UTC month, `YYYY-MM`.
   */
  month?: string;

  projectId?: string;

  userId?: string;

  automationId?: string;

  action?: string;

  category?: CreditCategory;

  source?: CreditSource;

  fromLanguage?: string;

  toLanguage?: string;

  /**
   * Credits spent in the group, excluding category `system` (decimal string).
   */
  spent: string;

  /**
   * Costs of category `system` in the group (decimal string).
   */
  adjusted: string;

  volume: number;

  transactions: number;
};

export type CreditSummaryResponse = {
  /**
   * The billing organization of the data. For a team, its parent organization.
   */
  organizationId: string;

  /**
   * Start of the period the server used, ISO 8601 UTC.
   */
  from: string;

  /**
   * End of the period the server used, ISO 8601 UTC.
   */
  to: string;

  /**
   * Current balance, independent of the period.
   */
  balance: CreditBalance;

  /**
   * Credits spent in the period, excluding category `system`; the figure to monitor (decimal string).
   */
  spent: string;

  /**
   * Costs of category `system`: trial credit reclaim and negative balance cover (decimal string).
   */
  adjusted: string;

  /**
   * Credits added in the period. The balance change is `toppedUp - spent - adjusted` (decimal string).
   */
  toppedUp: string;

  /**
   * Number of cost rows in the period.
   */
  transactions: number;

  /**
   * Sum of the volumes in the period.
   */
  volume: number;

  /**
   * Groups sorted by the keys in `groupBy` order. Empty when `groupBy` is empty.
   */
  groups: CreditSummaryGroup[];
};
