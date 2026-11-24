import type { ApiClient, KeyComment, Project } from '@/main.js';
import { Locales } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const commentsUrl: string =
  'https://api.localazy.com/projects/_a0000000000000000001/keys/_a0000000000000000001/comments';

const comment: KeyComment = {
  id: '_c000000000000000001',
  userId: '_u000000000000000001',
  text: "Is 'kus' better here?",
  edited: false,
  updatedAt: '2026-11-12T09:41:00Z',
};

const jsonInit = (method: string, body?: string): RequestInit => ({
  ...(body === undefined ? {} : { body }),
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
  method,
});

describe('Comments', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(`${commentsUrl}/zh%23Hans`, { comments: [comment] });
    fetchMock.post(`${commentsUrl}/cs`, { result: '_c000000000000000002' });
    fetchMock.put(`${commentsUrl}/cs/_c000000000000000001`, { result: true });
    fetchMock.delete(`${commentsUrl}/cs/_c000000000000000001`, { result: true });
    fetchMock.delete(`${commentsUrl}/cs/_c000000000000000009`, {
      status: 404,
      body: { success: false, code: 404, error: 'not_found' },
    });

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.comments.list', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const comments: KeyComment[] = await api.comments.list({
      project,
      key: '_a0000000000000000001',
      lang: 'zh#Hans',
    });

    expect(comments).toEqual([comment]);
    expect(spy).toHaveBeenCalledWith(`${commentsUrl}/zh%23Hans`, jsonInit('GET'));
  });

  test('api.comments.create', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const id: string = await api.comments.create({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      text: 'Yes.',
    });

    expect(id).toBe('_c000000000000000002');
    expect(spy).toHaveBeenCalledWith(`${commentsUrl}/cs`, jsonInit('POST', '{"text":"Yes."}'));
  });

  test('api.comments.update', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.comments.update({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      comment,
      text: "Is 'kusy' better here?",
    });

    expect(spy).toHaveBeenCalledWith(
      `${commentsUrl}/cs/_c000000000000000001`,
      jsonInit('PUT', '{"text":"Is \'kusy\' better here?"}'),
    );
  });

  test('api.comments.delete', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.comments.delete({
      project,
      key: '_a0000000000000000001',
      lang: Locales.CZECH,
      comment: '_c000000000000000001',
    });

    expect(spy).toHaveBeenCalledWith(`${commentsUrl}/cs/_c000000000000000001`, jsonInit('DELETE'));
  });

  test('api.comments.delete rejects a missing comment', async (): Promise<void> => {
    await expect(
      api.comments.delete({
        project,
        key: '_a0000000000000000001',
        lang: Locales.CZECH,
        comment: '_c000000000000000009',
      }),
    ).rejects.toThrow('Request failed with status code 404: not_found');
  });

  test('api.comments rejects an empty comment id', async (): Promise<void> => {
    await expect(
      api.comments.delete({ project, key: '_a0000000000000000001', lang: 'cs', comment: '' }),
    ).rejects.toThrow('Invalid comment ID.');
  });
});
