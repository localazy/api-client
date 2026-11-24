export type CreditTopupsListRequest = {
  /**
   * Organization ID or slug.
   */
  organization: string;

  /**
   * Start of the period (inclusive): an ISO 8601 date (`2026-11-01`, midnight UTC) or date-time.
   * Default: `to` minus 30 days. The period may be at most 366 days long.
   */
  from?: string | Date;

  /**
   * End of the period (exclusive), same format as `from`. Default and maximum: now minus 60 seconds.
   */
  to?: string | Date;
};
