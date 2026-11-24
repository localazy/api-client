/**
 * Credit balance of a billing organization. All values are decimal strings; parse them with a
 * decimal type, not `parseFloat`, to keep the precision.
 */
export type CreditBalance = {
  /**
   * Current credit balance.
   */
  balance: string;

  /**
   * The allowance granted by the most recent plan refill. Not a cap on the total credits.
   */
  limit: string;

  /**
   * Credits spent from that allowance since the refill.
   */
  limitSince: string;

  /**
   * What is left of the allowance: `limit` minus `limitSince`, never negative.
   */
  limitRemaining: string;
};
