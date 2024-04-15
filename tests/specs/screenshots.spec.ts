import { beforeEach, describe, expect, test } from 'vitest';
import { getApiClient, readImageFile, mockAdapter } from '@tests/support';
import { fullProject } from '@tests/fixtures';
import {
  ApiClient,
  Project,
  Screenshot,
  ScreenshotCreateRequest,
  ScreenshotDeleteRequest,
  ScreenshotTag,
  ScreenshotUpdateImageDataRequest,
  ScreenshotUpdateRequest,
} from '@/main';

describe('Screenshots', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.screenshots.list', async (): Promise<void> => {
    const screenshots: Screenshot[] = await api.screenshots.list({ project });

    expect(screenshots[0].comment).toBe('Hey! Nice screenshot.');
  });

  test('api.screenshots.listTags', async (): Promise<void> => {
    const tags: ScreenshotTag[] = await api.screenshots.listTags({ project });

    expect(tags[0]).toBe('Important example');
  });

  test('api.screenshots.create', async (): Promise<void> => {
    const encodedData: string = readImageFile('./tests/fixtures/screenshot.png', 'image/png');
    const request: ScreenshotCreateRequest = { project, encodedData };
    const screenshotId: string = await api.screenshots.create(request);

    expect(screenshotId).toBe('_a0000000000000000001');
    expect(mockAdapter.history.post.length).toBe(1);
    expect(mockAdapter.history.post[0].data).toMatchSnapshot();
  });

  test('api.screenshots.updateImageData', async (): Promise<void> => {
    const encodedData: string = readImageFile('./tests/fixtures/screenshot.png', 'image/png');
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotUpdateImageDataRequest = { project, screenshot: screenshots[0], encodedData };
    await api.screenshots.updateImageData(request);

    expect(mockAdapter.history.post.length).toBe(1);
    expect(mockAdapter.history.post[0].data).toMatchSnapshot();
  });

  test('api.screenshots.update', async (): Promise<void> => {
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotUpdateRequest = {
      project,
      screenshot: screenshots[0],
      comment: 'Hey! Nice screenshot.',
      tags: ['blue'],
    };
    await api.screenshots.update(request);

    expect(mockAdapter.history.put.length).toBe(1);
    expect(mockAdapter.history.put[0].data).toMatchSnapshot();
  });

  test('api.screenshots.delete', async (): Promise<void> => {
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotDeleteRequest = { project, screenshot: screenshots[0] };
    await api.screenshots.delete(request);

    expect(mockAdapter.history.delete.length).toBe(1);
    expect(mockAdapter.history.delete[0].data).toMatchSnapshot();
  });
});
