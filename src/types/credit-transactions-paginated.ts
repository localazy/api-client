import type { CreditTransactions } from '@/types/credit-transactions.js';

export type CreditTransactionsPaginated = CreditTransactions & {
  /**
   * Cursor of the next page. Not present on the last page.
   */
  next?: string;
};
