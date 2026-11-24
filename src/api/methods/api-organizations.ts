import { ApiBase } from '@/api/methods/api-base.js';
import type { CreditSummaryRequest } from '@/types/credit-summary-request.js';
import type { CreditSummaryResponse } from '@/types/credit-summary-response.js';
import type { CreditTopupsListRequest } from '@/types/credit-topups-list-request.js';
import type { CreditTopupsResponse } from '@/types/credit-topups-response.js';
import type { CreditTransactionsListRequest } from '@/types/credit-transactions-list-request.js';
import type { CreditTransactionsPaginated } from '@/types/credit-transactions-paginated.js';
import type { CreditTransaction, CreditTransactions } from '@/types/credit-transactions.js';
import type { OrganizationSearchRequest } from '@/types/organization-search-request.js';
import type { OrganizationSearchResponse } from '@/types/organization-search-response.js';
import type { OrganizationUsage } from '@/types/organization-usage.js';
import type { OrganizationUsageRequest } from '@/types/organization-usage-request.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiOrganizations extends ApiBase {
  /**
   * Get the source key quota usage and the credit balance of an organization.
   *
   * For a team (sub-organization) the figures are those of its parent billing organization, whose
   * ID is in `organizationId`. `keys.remaining` goes negative when the organization is over its quota.
   *
   * @param request Organization usage request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-usage#get-usage  Localazy API Docs}
   */
  public async getUsage(
    request: OrganizationUsageRequest,
    config?: RequestConfig,
  ): Promise<OrganizationUsage> {
    const orgId: string = ApiBase.getId(request.organization, 'organization');

    return (await this.api.client.get(
      `/organizations/${orgId}/usage`,
      config,
    )) as OrganizationUsage;
  }

  /**
   * Full-text search in the keys, comments and translations of all projects of an organization.
   *
   * Needs organization search in the plan, and a top-level organization: otherwise the call fails
   * with `search_not_available`. Returns at most 2000 results with no paging; projects the token's
   * user cannot read give no results and no error. The index lags behind changes by up to about an
   * hour.
   *
   * @param request Organization search request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-search#search  Localazy API Docs}
   */
  public async search(
    request: OrganizationSearchRequest,
    config?: RequestConfig,
  ): Promise<OrganizationSearchResponse> {
    const {
      organization,
      term,
      projects,
      excludeProjects,
      match,
      langs,
    }: OrganizationSearchRequest = request;
    const orgId: string = ApiBase.getId(organization, 'organization');
    const params: Record<string, string> = ApiOrganizations.params(config, {
      term,
      projects: projects && ApiBase.getIds(projects, 'project'),
      excludeProjects: excludeProjects && ApiBase.getIds(excludeProjects, 'project'),
      match,
      langs,
    });

    return (await this.api.client.get(`/organizations/${orgId}/search`, {
      ...config,
      params,
    })) as OrganizationSearchResponse;
  }

  /**
   * Get the credit consumption of an organization in a period, the credits topped up in it, and the
   * current balance, optionally grouped.
   *
   * `spent` excludes `system` costs, which are reported as `adjusted`. Credits belong to the billing
   * organization: for a team, the parent's data is returned.
   *
   * @param request Credit summary request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-credits#get-credit-summary  Localazy API Docs}
   */
  public async getCreditSummary(
    request: CreditSummaryRequest,
    config?: RequestConfig,
  ): Promise<CreditSummaryResponse> {
    const { organization, ...rest }: CreditSummaryRequest = request;
    const orgId: string = ApiBase.getId(organization, 'organization');

    return (await this.api.client.get(`/organizations/${orgId}/credits/summary`, {
      ...config,
      params: ApiOrganizations.params(config, rest),
    })) as CreditSummaryResponse;
  }

  /**
   * List all credit costs of an organization in a period, one row per charge, in time order.
   * Fetches every page; a long period can hold a very large number of rows.
   *
   * The `to` of the first page is reused for the following ones, so the pages cover one period.
   *
   * @param request Credit transactions list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-credits#list-credit-transactions  Localazy API Docs}
   */
  public async listCreditTransactions(
    request: CreditTransactionsListRequest,
    config?: RequestConfig,
  ): Promise<CreditTransactions> {
    const first: CreditTransactionsPaginated = await this.listCreditTransactionsPage(
      { ...request, next: undefined },
      config,
    );
    const transactions: CreditTransaction[] = [...first.transactions];
    let page: CreditTransactionsPaginated = first;

    while (page.next) {
      page = await this.listCreditTransactionsPage(
        { ...request, to: first.to, next: page.next },
        config,
      );
      transactions.push(...page.transactions);
    }

    return { organizationId: first.organizationId, from: first.from, to: first.to, transactions };
  }

  /**
   * List credit costs of an organization in a period, one row per charge, in time order. Result is
   * paginated.
   *
   * Request the next page with `next` and the same `to` as the first page; when `to` was omitted,
   * pass the `to` of the first response, since the default moves with the clock.
   *
   * @param request Credit transactions list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-credits#list-credit-transactions  Localazy API Docs}
   */
  public async listCreditTransactionsPage(
    request: CreditTransactionsListRequest,
    config?: RequestConfig,
  ): Promise<CreditTransactionsPaginated> {
    const { organization, ...rest }: CreditTransactionsListRequest = request;
    const orgId: string = ApiBase.getId(organization, 'organization');

    return (await this.api.client.get(`/organizations/${orgId}/credits/transactions`, {
      ...config,
      params: ApiOrganizations.params(config, rest),
    })) as CreditTransactionsPaginated;
  }

  /**
   * List the credits added to an organization in a period, in time order, with no paging.
   *
   * @param request Credit topups list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/organization-credits#list-credit-topups  Localazy API Docs}
   */
  public async listCreditTopups(
    request: CreditTopupsListRequest,
    config?: RequestConfig,
  ): Promise<CreditTopupsResponse> {
    const { organization, ...rest }: CreditTopupsListRequest = request;
    const orgId: string = ApiBase.getId(organization, 'organization');

    return (await this.api.client.get(`/organizations/${orgId}/credits/topups`, {
      ...config,
      params: ApiOrganizations.params(config, rest),
    })) as CreditTopupsResponse;
  }

  /**
   * An empty list is sent as an empty value only for `groupBy`, which reads it as "totals only";
   * elsewhere it would turn a filter into a filter that matches nothing.
   */
  private static params(
    config: RequestConfig | undefined,
    values: Record<string, string | number | Date | string[] | undefined>,
  ): Record<string, string> {
    const params: Record<string, string> = { ...config?.params };

    for (const [name, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        if (value.length > 0 || name === 'groupBy') {
          params[name] = value.join(',');
        }
      } else if (value instanceof Date) {
        params[name] = value.toISOString();
      } else if (value !== undefined) {
        params[name] = String(value);
      }
    }

    return params;
  }
}
