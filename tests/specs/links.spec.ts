import type { ApiClient, Link, Project } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getApiUrl, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const linksUrl: string = `${getApiUrl()}/projects/_a0000000000000000001/links`;

const firstLink: Link = {
  keyId: '_a0000000000000000001',
  linkedProjectId: '_a0000000000000000001',
  linkedKeyId: '_a0000000000000000002',
};

const secondLink: Link = {
  keyId: '_a0000000000000000003',
  linkedProjectId: '_a0000000000000000009',
  linkedKeyId: '_a0000000000000000004',
};

describe('Links', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(`${linksUrl}?next=page2`, { links: [secondLink] });
    fetchMock.get(`begin:${linksUrl}`, { links: [firstLink], next: 'page2' });
    fetchMock.post(`begin:${linksUrl}/`, { result: true });
    fetchMock.delete(`begin:${linksUrl}/`, { result: true });

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.links.list follows the cursor', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const links: Link[] = await api.links.list({ project });

    expect(links).toEqual([firstLink, secondLink]);
    expect(spy).toHaveBeenNthCalledWith(1, linksUrl, expect.objectContaining({ method: 'GET' }));
    expect(spy).toHaveBeenNthCalledWith(
      2,
      `${linksUrl}?next=page2`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('api.links.list resumes from a cursor', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const links: Link[] = await api.links.list({ project, next: 'page2' });

    expect(links).toEqual([secondLink]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${linksUrl}?next=page2`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('api.links.listPage keeps the params of the config', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.links.listPage({ project, limit: 50 }, { params: { trace: '1' } });

    expect(spy).toHaveBeenCalledWith(
      `${linksUrl}?trace=1&limit=50`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('api.links.listPage', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const page = await api.links.listPage({ project: '_a0000000000000000001', limit: 50 });

    expect(page).toEqual({ links: [firstLink], next: 'page2' });
    expect(spy).toHaveBeenCalledWith(`${linksUrl}?limit=50`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  test('api.links.create', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.links.create({
      project,
      key: { id: '_a0000000000000000001' } as never,
      linkedKey: '_a0000000000000000002',
    });

    expect(spy).toHaveBeenCalledWith(`${linksUrl}/_a0000000000000000001`, {
      body: '{"keyId":"_a0000000000000000002"}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.links.create across projects', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.links.create({
      project,
      key: '_a0000000000000000001',
      linkedKey: '_a0000000000000000004',
      linkedProject: 'other-project',
    });

    expect(spy).toHaveBeenCalledWith(
      `${linksUrl}/_a0000000000000000001`,
      expect.objectContaining({
        body: '{"keyId":"_a0000000000000000004","project":"other-project"}',
        method: 'POST',
      }),
    );
  });

  test('api.links.delete', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.links.delete({ project, key: '_a0000000000000000001' });

    expect(spy).toHaveBeenCalledWith(`${linksUrl}/_a0000000000000000001`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  });
});
