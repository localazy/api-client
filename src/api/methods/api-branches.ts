import { ApiBase } from '@/api/methods/api-base.js';
import type { Branch } from '@/types/branch.js';
import type { BranchAnalyzeMergeRequest } from '@/types/branch-analyze-merge-request.js';
import type { BranchCreateRequest } from '@/types/branch-create-request.js';
import type { BranchDeleteRequest } from '@/types/branch-delete-request.js';
import type { BranchGetOperationRequest } from '@/types/branch-get-operation-request.js';
import type { BranchListRequest } from '@/types/branch-list-request.js';
import type { BranchMergeAnalysis } from '@/types/branch-merge-analysis.js';
import type { BranchMergeRequest } from '@/types/branch-merge-request.js';
import type { BranchOperationStatus } from '@/types/branch-operation-status.js';
import type { BranchRenameRequest } from '@/types/branch-rename-request.js';
import type { BranchSeparateRequest } from '@/types/branch-separate-request.js';
import type { BranchSetMainRequest } from '@/types/branch-set-main-request.js';
import type { RequestConfig } from '@/types/request-config.js';

/**
 * Branching is a plan feature; without it every method rejects with `400` (`unpaid`). Branches other
 * than the one `project` addresses are referred to by name, and `project` may be any branch.
 */
export class ApiBranches extends ApiBase {
  /**
   * List all {@link Branch  branches} of the project: `main` first, then the others by name. The
   * result is the same whichever branch `project` addresses, and includes branches the caller is
   * not a member of.
   *
   * @param request Branch list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#list-branches  Localazy API Docs}
   */
  public async list(request: BranchListRequest, config?: RequestConfig): Promise<Branch[]> {
    const { project }: BranchListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { branches: Branch[] } = (await this.api.client.get(
      `/projects/${projectId}/branches`,
      config,
    )) as { branches: Branch[] };

    return response.branches;
  }

  /**
   * Create a branch as a copy of `source`, or of its settings only with `empty: true`.
   *
   * The copy runs in the background: poll the returned operation ID with `getOperation()` until it
   * is `done` or `error`.
   *
   * @param request Branch create request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#create-a-branch  Localazy API Docs}
   */
  public async create(request: BranchCreateRequest, config?: RequestConfig): Promise<string> {
    const { project, source, ...data }: BranchCreateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const response: { result: string } = (await this.api.client.post(
      `/projects/${projectId}/branches`,
      source === undefined ? data : { ...data, source: ApiBranches.getName(source, 'source') },
      config,
    )) as { result: string };

    return response.result;
  }

  /**
   * Rename a branch. Its `projectId` stays; its slug ends with `!<new name>`. The main branch cannot
   * be renamed; use `setMain()` instead.
   *
   * @param request Branch rename request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#rename-a-branch  Localazy API Docs}
   */
  public async rename(request: BranchRenameRequest, config?: RequestConfig): Promise<void> {
    const { project, branch, name }: BranchRenameRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');

    await this.api.client.put(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}`,
      { name },
      config,
    );
  }

  /**
   * Delete a branch: its project is archived with all its content.
   *
   * Rejected with `400` for the main branch, a branch other branches were made from, the source of
   * linked keys, a branch whose glossary or translation memory other projects use, or while
   * duplicity resolution runs for it.
   *
   * @param request Branch delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#delete-a-branch  Localazy API Docs}
   */
  public async delete(request: BranchDeleteRequest, config?: RequestConfig): Promise<void> {
    const { project, branch }: BranchDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');

    await this.api.client.delete(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}`,
      config,
    );
  }

  /**
   * Make `branch` the main branch. No content moves: `branch` takes the name `main` and the old main
   * slug, and the old main branch takes `name`. Every `projectId` stays, so a branch token keeps
   * addressing the same content even though its branch name may change.
   *
   * @param request Branch set main request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#set-the-main-branch  Localazy API Docs}
   */
  public async setMain(request: BranchSetMainRequest, config?: RequestConfig): Promise<void> {
    const { project, branch, name }: BranchSetMainRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');

    await this.api.client.post(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}/main`,
      { name },
      config,
    );
  }

  /**
   * Turn a branch into an independent project. It keeps its `projectId` and content, loses the
   * `!<name>` slug suffix, leaves `list()`, and can no longer be merged with the project's branches.
   * Branches made from it are re-parented to its own source. The main branch cannot be separated.
   *
   * @param request Branch separate request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#separate-a-branch  Localazy API Docs}
   */
  public async separate(request: BranchSeparateRequest, config?: RequestConfig): Promise<void> {
    const { project, branch }: BranchSeparateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');

    await this.api.client.post(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}/separate`,
      undefined,
      config,
    );
  }

  /**
   * Report what `merge()` with the same request would do, changing nothing. It answers only when the
   * analysis finishes, which can take long on a large project, and fails with `409` while another
   * analysis or merge runs on one of the branches it uses.
   *
   * @param request Branch analyze merge request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#analyze-a-merge  Localazy API Docs}
   */
  public async analyzeMerge(
    request: BranchAnalyzeMergeRequest,
    config?: RequestConfig,
  ): Promise<BranchMergeAnalysis> {
    const { project, branch, ...data }: BranchAnalyzeMergeRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');

    return (await this.api.client.post(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}/analysis`,
      ApiBranches.mergeBody(data),
      config,
    )) as BranchMergeAnalysis;
  }

  /**
   * Merge `branch` into `target`. Run `analyzeMerge()` with the same request first: a merge cannot
   * be reverted, and the `target` and `time-bidi` strategies also write back to the source branch.
   *
   * The merge runs in the background. The returned operation ID goes to `getOperation()`; poll it
   * until the status is `done` (with the merge counts) or `error`. It fails with `409` while
   * another analysis or merge runs on one of the branches it uses.
   *
   * @param request Branch merge request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#merge-branches  Localazy API Docs}
   */
  public async merge(request: BranchMergeRequest, config?: RequestConfig): Promise<string> {
    const { project, branch, ...data }: BranchMergeRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const branchName: string = ApiBranches.getName(branch, 'branch');
    const response: { result: string } = (await this.api.client.post(
      `/projects/${projectId}/branches/${encodeURIComponent(branchName)}/merge`,
      ApiBranches.mergeBody(data),
      config,
    )) as { result: string };

    return response.result;
  }

  /**
   * Get the status of an operation started by `create()` or `merge()`. Poll while the status is
   * `scheduled` or `in_progress`. An unknown, expired (after 48 hours) or foreign ID resolves with
   * status `invalid_id`; only a malformed ID rejects.
   *
   * @param request Branch get operation request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/branching#check-the-status-of-an-operation  Localazy API Docs}
   */
  public async getOperation(
    request: BranchGetOperationRequest,
    config?: RequestConfig,
  ): Promise<BranchOperationStatus> {
    const { project, operation }: BranchGetOperationRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    if (!operation) {
      throw new Error('Invalid operation ID.');
    }

    return (await this.api.client.get(
      `/projects/${projectId}/branches/operations/${encodeURIComponent(operation)}`,
      config,
    )) as BranchOperationStatus;
  }

  protected static getName(val: string | Pick<Branch, 'name'>, prop: string): string {
    const name: string = typeof val === 'string' ? val : val.name || '';

    // `.` and `..` are dot-segments: URL resolution would drop them and hit another endpoint.
    if (!name || name === '.' || name === '..') {
      throw new Error(`Invalid ${prop} name.`);
    }

    return name;
  }

  protected static mergeBody(
    data: Omit<BranchAnalyzeMergeRequest, 'project' | 'branch'>,
  ): Record<string, unknown> {
    const { target, keys, ...options } = data;

    return {
      ...options,
      target: ApiBranches.getName(target, 'target'),
      ...(keys === undefined ? {} : { keys: ApiBase.getIds(keys, 'key') }),
    };
  }
}
