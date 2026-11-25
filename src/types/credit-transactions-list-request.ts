export type CreditTransactionsListRequest = {
  /**
   * Organization ID or slug.
   */
  organization: string;

  /**
   * Start of the period (inclusive): an ISO 8601 date (`2026-11-01`, midnight UTC) or date-time.
   * Default: `to` minus 30 days. The period may be at most 366 days long. Ignored with `next`.
   */
  from?: string | Date;

  /**
   * End of the period (exclusive), same format as `from`. Default and maximum: now minus 60 seconds.
   * Pass the same value with `next` as with the first page.
   */
  to?: string | Date;

  /**
   * Page size, 1 to 10000. Default 1000.
   */
  limit?: number;

  /**
   * The `next` value of the previous page.
   */
  next?: string;
};
