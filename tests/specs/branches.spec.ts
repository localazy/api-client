import type {
  ApiClient,
  Branch,
  BranchMergeAnalysis,
  BranchOperationStatus,
  Project,
} from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const baseUrl = 'https://api.localazy.com/projects/_a0000000000000000001/branches';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
};

const branches: Branch[] = [
  { name: 'main', projectId: '_a0000000000000000001', slug: 'mobile-app', main: true },
  {
    name: 'release-2',
    projectId: '_a0000000000000000002',
    slug: 'mobile-app!release-2',
    main: false,
    source: 'main',
  },
];

const analysis: BranchMergeAnalysis = {
  languages: [
    {
      lang: 'cs',
      newKeys: 0,
      newTranslations: 12,
      updated: 0,
      equal: 480,
      conflicts: 1,
      failures: 0,
      resolvedFromSource: 0,
      resolvedFromTarget: 0,
    },
  ],
  newFiles: ['checkout.json'],
  newLanguages: [],
  deprecatedKeys: 0,
  conflicts: [
    {
      lang: 'cs',
      file: 'strings.json',
      key: ['cart', 'title'],
      sourceKeyId: '_a0000000000000000001',
      targetKeyId: '_a0000000000000000002',
      sourceValue: 'Košík',
      targetValue: 'Nákupní košík',
    },
  ],
};

const mergeStatus: BranchOperationStatus = {
  status: 'done',
  changes: 15,
  resolved: 0,
  conflicts: 1,
  failures: 0,
  newFiles: 1,
  newLanguages: 0,
};

describe('Branches', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    fetchMock.get(baseUrl, { branches });
    fetchMock.post(baseUrl, { result: '_a0000000000000000099' });
    fetchMock.put(`${baseUrl}/release-2`, { result: true });
    fetchMock.delete(`${baseUrl}/release-2`, { result: true });
    fetchMock.post(`${baseUrl}/release-2/main`, { result: true });
    fetchMock.post(`${baseUrl}/release-2/separate`, { result: true });
    fetchMock.post(`${baseUrl}/release-2/analysis`, analysis);
    fetchMock.post(`${baseUrl}/release-2/merge`, { result: '_a0000000000000000098' });
    fetchMock.get(`${baseUrl}/operations/_a0000000000000000098`, mergeStatus);

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.branches.list', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: Branch[] = await api.branches.list({ project });

    expect(spy).toHaveBeenCalledWith(baseUrl, { headers, method: 'GET' });
    expect(result).toEqual(branches);
  });

  test('api.branches.create', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: string = await api.branches.create({
      project,
      name: 'release-3',
      source: branches[1],
      empty: true,
    });

    expect(spy).toHaveBeenCalledWith(baseUrl, {
      body: '{"name":"release-3","empty":true,"source":"release-2"}',
      headers,
      method: 'POST',
    });
    expect(result).toBe('_a0000000000000000099');
  });

  test('api.branches.create without source', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.branches.create({ project: '_a0000000000000000001', name: 'release-3' });

    expect(spy).toHaveBeenCalledWith(
      baseUrl,
      expect.objectContaining({ body: '{"name":"release-3"}' }),
    );
  });

  test('api.branches.rename', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.branches.rename({ project, branch: 'release-2', name: 'release-3' });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2`, {
      body: '{"name":"release-3"}',
      headers,
      method: 'PUT',
    });
  });

  test('api.branches.delete', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.branches.delete({ project, branch: { name: 'release-2' } });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2`, { headers, method: 'DELETE' });
  });

  test('api.branches.setMain', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.branches.setMain({ project, branch: 'release-2', name: 'legacy' });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2/main`, {
      body: '{"name":"legacy"}',
      headers,
      method: 'POST',
    });
  });

  test('api.branches.separate', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.branches.separate({ project, branch: 'release-2' });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2/separate`, { headers, method: 'POST' });
  });

  test('api.branches.analyzeMerge', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: BranchMergeAnalysis = await api.branches.analyzeMerge({
      project,
      branch: 'release-2',
      target: branches[0],
      strategy: 'reference',
      languages: ['cs'],
      keys: [{ id: '_a0000000000000000001' }, '_a0000000000000000002'],
      details: ['conflicts'],
    });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2/analysis`, {
      body: '{"strategy":"reference","languages":["cs"],"details":["conflicts"],"target":"main","keys":["_a0000000000000000001","_a0000000000000000002"]}',
      headers,
      method: 'POST',
    });
    expect(result).toEqual(analysis);
  });

  test('api.branches.merge', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: string = await api.branches.merge({
      project,
      branch: 'release-2',
      target: 'main',
      deprecateMissing: true,
    });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/release-2/merge`, {
      body: '{"deprecateMissing":true,"target":"main"}',
      headers,
      method: 'POST',
    });
    expect(result).toBe('_a0000000000000000098');
  });

  test('api.branches.getOperation', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: BranchOperationStatus = await api.branches.getOperation({
      project,
      operation: '_a0000000000000000098',
    });

    expect(spy).toHaveBeenCalledWith(`${baseUrl}/operations/_a0000000000000000098`, {
      headers,
      method: 'GET',
    });
    expect(result).toEqual(mergeStatus);
  });

  test('api.branches rejects a dot-segment branch name', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await expect(api.branches.delete({ project, branch: '..' })).rejects.toThrow(
      'Invalid branch name.',
    );
    await expect(api.branches.rename({ project, branch: '.', name: 'x1' })).rejects.toThrow(
      'Invalid branch name.',
    );
    expect(spy).not.toHaveBeenCalled();
  });

  test('api.branches rejects a missing branch name', async (): Promise<void> => {
    await expect(api.branches.delete({ project, branch: '' })).rejects.toThrow(
      'Invalid branch name.',
    );
    await expect(
      api.branches.merge({ project, branch: 'release-2', target: { name: '' } }),
    ).rejects.toThrow('Invalid target name.');
  });
});
