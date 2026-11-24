/**
 * Kind of a credit cost. `system` covers balance adjustments (trial credit reclaim, negative balance
 * cover). `unknown` stands for a value newer than the API documentation.
 */
export type CreditCategory = 'mt' | 'ai' | 'clt' | 'system' | 'none' | 'unknown';

/**
 * What started a credit cost. `unknown` stands for a value newer than the API documentation.
 */
export type CreditSource =
  | 'batch'
  | 'automations'
  | 'clt'
  | 'system'
  | 'suggestions'
  | 'api'
  | 'none'
  | 'unknown';

export type CreditTransaction = {
  /**
   * Time of the charge, ISO 8601 UTC with up to 6 fraction digits.
   */
  ts: string;

  /**
   * Cost in credits (decimal string).
   */
  amount: string;

  /**
   * Volume of the charge, usually the number of words.
   */
  volume: number;

  category: CreditCategory;

  /**
   * The engine or service, e.g. `localazyAi`, `deepl`, `clt_translate` or `balance`.
   */
  action: string;

  source: CreditSource;

  projectId?: string;

  keyId?: string;

  fromLanguage?: string;

  toLanguage?: string;

  /**
   * Present when a user started the charge.
   */
  userId?: string;

  /**
   * Present when an automation started the charge.
   */
  automationId?: string;
};

export type CreditTransactions = {
  /**
   * The billing organization of the data. For a team, its parent organization.
   */
  organizationId: string;

  /**
   * Start of the period the server used, ISO 8601 UTC.
   */
  from: string;

  /**
   * End of the period the server used, ISO 8601 UTC. Pass it as `from` of the next incremental sync.
   */
  to: string;

  /**
   * One row per charge, in time order.
   */
  transactions: CreditTransaction[];
};
