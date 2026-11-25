import type { ApiClient, Project, SegmentationParent } from '@/main.js';
import { Locales } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { fetchMock, getApiClient, getApiUrl, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const parentsUrl: string = `${getApiUrl()}/projects/_a0000000000000000001/segmentation/parents`;

const parent: SegmentationParent = {
  id: '_e845123154101354564',
  handle: '_b1c2d3e4f5061708',
  key: ['home', 'intro'],
  file: '_e845123154101354500',
  deprecated: -1,
  explicit: false,
  template: '{{__llsg:a1b2c3}}\n\n{{__llsg:d4e5f6}}',
  value: 'Primeiro parágrafo.\n\nSecond paragraph.',
  segments: [
    { id: '_e845123154101354565', segIndex: 0 },
    { id: '_e845123154101354566', segIndex: 1 },
  ],
};

describe('Segmentation', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();
    fetchMock.get(`begin:${parentsUrl}/`, parent);

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.segmentation.getParent', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const result: SegmentationParent = await api.segmentation.getParent({
      project,
      parent: '_e845123154101354564',
      lang: Locales.BRAZILIAN_PORTUGUESE,
    });

    expect(result).toEqual(parent);
    expect(spy).toHaveBeenCalledWith(`${parentsUrl}/_e845123154101354564/pt_BR`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  test('api.segmentation.getParent escapes the language', async (): Promise<void> => {
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.segmentation.getParent({
      project,
      parent: { id: '_b1c2d3e4f5061708' } as never,
      lang: 'zh#Hans',
    });

    expect(spy).toHaveBeenCalledWith(
      `${parentsUrl}/_b1c2d3e4f5061708/zh%23Hans`,
      expect.anything(),
    );
  });

  test('api.segmentation.getParent rejects a missing language', async (): Promise<void> => {
    await expect(
      api.segmentation.getParent({ project, parent: '_b1c2d3e4f5061708', lang: '' as never }),
    ).rejects.toThrow('Invalid lang language.');
  });
});
