import type { BranchMergeDetail } from '@/types/branch-merge-detail.js';
import type { BranchMergeRequest } from '@/types/branch-merge-request.js';

export type BranchAnalyzeMergeRequest = BranchMergeRequest & {
  /**
   * Lists to include besides the counts. They have no length limit, so a large project can give a
   * large response.
   */
  details?: BranchMergeDetail[];
};
