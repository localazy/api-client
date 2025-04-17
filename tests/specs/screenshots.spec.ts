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
import { fullProject } from '@tests/fixtures';
import { getApiClient, getToken, readImageFile } from '@tests/support';
import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest';

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
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const screenshotId: string = await api.screenshots.create(request);

    expect(screenshotId).toBe('_a0000000000000000001');
    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/screenshots', {
      body: `"${encodedData}"`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.screenshots.updateImageData', async (): Promise<void> => {
    const encodedData: string = readImageFile('./tests/fixtures/screenshot.png', 'image/png');
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotUpdateImageDataRequest = { project, screenshot: screenshots[0], encodedData };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.screenshots.updateImageData(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/screenshots/_a0000000000000000001',
      {
        body: `"${encodedData}"`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  });

  test('api.screenshots.update', async (): Promise<void> => {
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotUpdateRequest = {
      project,
      screenshot: screenshots[0],
      comment: 'Hey! Nice screenshot.',
      tags: ['blue'],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.screenshots.update(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/screenshots/_a0000000000000000001',
      {
        body: '{"comment":"Hey! Nice screenshot.","tags":["blue"]}',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
  });

  test('api.screenshots.delete', async (): Promise<void> => {
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const request: ScreenshotDeleteRequest = { project, screenshot: screenshots[0] };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    await api.screenshots.delete(request);

    expect(spy).toHaveBeenCalledWith(
      'https://api.localazy.com/projects/_a0000000000000000001/screenshots/_a0000000000000000001',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      },
    );
  });
});
