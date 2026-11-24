import type {
  ApiClient,
  CreditSummaryResponse,
  CreditTopupsResponse,
  CreditTransactions,
  CreditTransactionsPaginated,
  OrganizationSearchResponse,
  OrganizationUsage,
  Project,
} from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const orgUrl: string = 'https://api.localazy.com/organizations/_a0000000000000000001';
const orgId: string = '_a0000000000000000001';

const usage: OrganizationUsage = {
  organizationId: orgId,
  keys: { used: 52000, limit: 50000, remaining: -2000 },
  credits: { balance: '128.50', limit: '100', limitSince: '42.75', limitRemaining: '57.25' },
};

const searchResponse: OrganizationSearchResponse = {
  results: [
    {
      projectId: '_a0000000000000000001',
      keyId: '_a0000000000000000002',
      key: ['cart', 'items'],
      file: 'locales/en.json',
      match: 'translation',
      lang: 'de',
      value: { '@one': '1 Artikel', '@other': '%d Artikel' },
      comment: '',
      contextNote: 'Keep it short.',
      hidden: false,
    },
  ],
  projects: [{ id: '_a0000000000000000001', name: 'Mobile App', slug: 'mobile-app' }],
};

const summary: CreditSummaryResponse = {
  organizationId: orgId,
  from: '2026-11-01T00:00:00Z',
  to: '2026-11-03T00:00:00Z',
  balance: {
    balance: '812.4375',
    limit: '1000',
    limitSince: '187.5625',
    limitRemaining: '812.4375',
  },
  spent: '187.5625',
  adjusted: '0',
  toppedUp: '1000',
  transactions: 4160,
  volume: 96250,
  groups: [
    {
      day: '2026-11-01',
      category: 'ai',
      spent: '92.25',
      adjusted: '0',
      volume: 92250,
      transactions: 4120,
    },
    {
      day: '2026-11-01',
      category: 'clt',
      spent: '60',
      adjusted: '0',
      volume: 4000,
      transactions: 40,
    },
  ],
};

const transactionsPage1: CreditTransactionsPaginated = {
  organizationId: orgId,
  from: '2026-11-01T00:00:00Z',
  to: '2026-11-18T09:41:00Z',
  transactions: [
    {
      ts: '2026-11-01T07:12:44.120533Z',
      amount: '0.0125',
      volume: 25,
      category: 'ai',
      action: 'localazyAi',
      source: 'automations',
      projectId: '_a0000000000000000001',
      keyId: '_a0000000000000000002',
      fromLanguage: 'en',
      toLanguage: 'de',
      automationId: '_a0000000000000000003',
    },
  ],
  next: 'djE6MTc2MTk4MTMwMjAwNDQxMDox',
};

const transactionsPage2: CreditTransactionsPaginated = {
  organizationId: orgId,
  from: '2026-11-01T07:12:44.120533Z',
  to: '2026-11-18T09:41:00Z',
  transactions: [
    {
      ts: '2026-11-01T07:15:02.00441Z',
      amount: '1.5',
      volume: 150,
      category: 'clt',
      action: 'clt_translate',
      source: 'clt',
      userId: '_a0000000000000000004',
    },
  ],
};

const topups: CreditTopupsResponse = {
  organizationId: orgId,
  from: '2026-10-01T00:00:00Z',
  to: '2026-11-18T09:41:00Z',
  topups: [
    { ts: '2026-10-01T00:00:03.112Z', type: 'plan', amount: '640.5', limit: '1000' },
    { ts: '2026-10-14T13:20:11.9Z', type: 'extra', amount: '500' },
  ],
};

const expectedRequest = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
  method: 'GET',
};

describe('Organizations', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(`${orgUrl}/usage`, usage);
    fetchMock.get(`begin:${orgUrl}/search?`, searchResponse);
    fetchMock.get(`begin:${orgUrl}/credits/summary`, summary);
    fetchMock.get(
      `${orgUrl}/credits/transactions?to=2026-11-18T09%3A41%3A00Z&next=djE6MTc2MTk4MTMwMjAwNDQxMDox`,
      transactionsPage2,
    );
    fetchMock.get(`begin:${orgUrl}/credits/transactions`, transactionsPage1);
    fetchMock.get(`begin:${orgUrl}/credits/topups`, topups);

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.organizations.getUsage', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: OrganizationUsage = await api.organizations.getUsage({ organization: orgId });

    expect(response).toEqual(usage);
    expect(spy).toHaveBeenCalledWith(`${orgUrl}/usage`, expectedRequest);
  });

  test('api.organizations.getUsage rejects an empty organization', async (): Promise<void> => {
    await expect(api.organizations.getUsage({ organization: '' })).rejects.toThrow(
      'Invalid organization ID.',
    );
  });

  test('api.organizations.search', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: OrganizationSearchResponse = await api.organizations.search({
      organization: orgId,
      term: 'cart',
      projects: [project, '_a0000000000000000009'],
      excludeProjects: ['_a0000000000000000008'],
      match: ['key', 'translation'],
      langs: ['de', 'zh#Hans'],
    });

    expect(response).toEqual(searchResponse);
    expect(spy).toHaveBeenCalledWith(
      `${orgUrl}/search?term=cart&projects=_a0000000000000000001%2C_a0000000000000000009&excludeProjects=_a0000000000000000008&match=key%2Ctranslation&langs=de%2Czh%23Hans`,
      expectedRequest,
    );
  });

  test('api.organizations.search with only a term', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.organizations.search({ organization: orgId, term: 'cart' });

    expect(spy).toHaveBeenCalledWith(`${orgUrl}/search?term=cart`, expectedRequest);
  });

  test('api.organizations.search leaves out empty filters', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.organizations.search({
      organization: orgId,
      term: 'cart',
      projects: [],
      excludeProjects: [],
      match: [],
      langs: [],
    });

    expect(spy).toHaveBeenCalledWith(`${orgUrl}/search?term=cart`, expectedRequest);
  });

  test('api.organizations.search keeps the params of the config', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.organizations.search(
      { organization: orgId, term: 'cart' },
      { params: { trace: '1' } },
    );

    expect(spy).toHaveBeenCalledWith(`${orgUrl}/search?trace=1&term=cart`, expectedRequest);
  });

  test('api.organizations.getCreditSummary', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: CreditSummaryResponse = await api.organizations.getCreditSummary({
      organization: orgId,
      from: '2026-11-01',
      to: new Date('2026-11-03T00:00:00Z'),
      groupBy: ['day', 'category'],
    });

    expect(response).toEqual(summary);
    expect(spy).toHaveBeenCalledWith(
      `${orgUrl}/credits/summary?from=2026-11-01&to=2026-11-03T00%3A00%3A00.000Z&groupBy=day%2Ccategory`,
      expectedRequest,
    );
  });

  test('api.organizations.getCreditSummary sends an empty groupBy for totals only', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.organizations.getCreditSummary({ organization: orgId, groupBy: [] });

    expect(spy).toHaveBeenCalledWith(`${orgUrl}/credits/summary?groupBy=`, expectedRequest);
  });

  test('api.organizations.listCreditTransactionsPage', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: CreditTransactionsPaginated =
      await api.organizations.listCreditTransactionsPage({
        organization: orgId,
        from: '2026-11-01',
        limit: 1,
      });

    expect(response).toEqual(transactionsPage1);
    expect(spy).toHaveBeenCalledWith(
      `${orgUrl}/credits/transactions?from=2026-11-01&limit=1`,
      expectedRequest,
    );
  });

  test('api.organizations.listCreditTransactions pins `to` across pages', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: CreditTransactions = await api.organizations.listCreditTransactions({
      organization: orgId,
    });

    expect(response).toEqual({
      organizationId: orgId,
      from: '2026-11-01T00:00:00Z',
      to: '2026-11-18T09:41:00Z',
      transactions: [...transactionsPage1.transactions, ...transactionsPage2.transactions],
    });
    expect(spy).toHaveBeenNthCalledWith(1, `${orgUrl}/credits/transactions?`, expectedRequest);
    expect(spy).toHaveBeenNthCalledWith(
      2,
      `${orgUrl}/credits/transactions?to=2026-11-18T09%3A41%3A00Z&next=djE6MTc2MTk4MTMwMjAwNDQxMDox`,
      expectedRequest,
    );
  });

  test('api.organizations.listCreditTopups', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: CreditTopupsResponse = await api.organizations.listCreditTopups({
      organization: orgId,
      from: '2026-10-01',
    });

    expect(response).toEqual(topups);
    expect(spy).toHaveBeenCalledWith(`${orgUrl}/credits/topups?from=2026-10-01`, expectedRequest);
  });
});
