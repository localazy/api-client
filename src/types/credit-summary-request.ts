/**
 * A key to group credit consumption by. `user` yields `userId` or `automationId`; `language` yields
 * `fromLanguage` and `toLanguage`.
 */
export type CreditGroupBy =
  | 'day'
  | 'month'
  | 'project'
  | 'user'
  | 'action'
  | 'category'
  | 'source'
  | 'language';

export type CreditSummaryRequest = {
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

  /**
   * Group keys, each at most once, and not both `day` and `month`. Groups by `day` when omitted;
   * an empty list gives the totals only.
   */
  groupBy?: CreditGroupBy[];
};
