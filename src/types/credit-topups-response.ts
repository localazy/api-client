/**
 * Kind of a credit topup:
 * - `plan`: refill of the plan allowance.
 * - `extra`: credits outside the plan (purchase, bonus).
 * - `balance_cover`: cover of a negative balance at a plan refill, booked together with an equal
 *   `adjusted` cost, so the pair leaves the balance unchanged.
 */
export type CreditTopupType = 'plan' | 'extra' | 'balance_cover';

export type CreditTopup = {
  /**
   * Time of the topup, ISO 8601 UTC.
   */
  ts: string;

  type: CreditTopupType;

  /**
   * Credits added (decimal string). For `plan` this is the part the refill added: 0 when nothing was
   * spent since the last refill, negative after a move to a smaller plan.
   */
  amount: string;

  /**
   * The plan allowance (decimal string). Only for `plan`.
   */
  limit?: string;
};

export type CreditTopupsResponse = {
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
   * Topups in time order, with no paging.
   */
  topups: CreditTopup[];
};
