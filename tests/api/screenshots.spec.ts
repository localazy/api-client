import { Screenshot, ScreenshotTag, ScreenshotUpdateRequest } from '~/main';
import { downloadImageFile, readImageFile } from '../test-utils';

describe('Screenshots', (): void => {
  test('api.screenshots.list', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');
    const screenshotId: string = await api.screenshots.create({ project, encodedData });
    const updateData: Omit<ScreenshotUpdateRequest, 'project' | 'screenshot'> = {
      comment: 'Hey! Nice screenshot.',
      tags: ['Important example'],
    };
    await api.screenshots.update({ project, screenshot: screenshotId, ...updateData });

    // test
    const screenshots: Screenshot[] = await api.screenshots.list({ project });

    // verify
    expect(screenshots[0].comment).toBe('Hey! Nice screenshot.');

    // clean
    await api.screenshots.delete({ project, screenshot: screenshotId });
  });

  test('api.screenshots.listTags', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');
    const screenshotId: string = await api.screenshots.create({ project, encodedData });
    const updateData: Omit<ScreenshotUpdateRequest, 'project' | 'screenshot'> = {
      comment: 'Hey! Nice screenshot.',
      tags: ['Important example'],
    };
    await api.screenshots.update({ project, screenshot: screenshotId, ...updateData });

    // test
    const tags: ScreenshotTag[] = await api.screenshots.listTags({ project });

    // verify
    expect(tags[0]).toBe('Important example');

    // clean
    await api.screenshots.delete({ project, screenshot: screenshotId });
  });

  test('api.screenshots.create', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');

    // test
    const screenshotId: string = await api.screenshots.create({ project, encodedData });

    // verify
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const recordExists: boolean = screenshots.some((i: Screenshot): boolean => i.id === screenshotId);
    expect(recordExists).toBe(true);

    // clean
    await api.screenshots.delete({ project, screenshot: screenshotId });
  });

  test('api.screenshots.updateImageData', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');
    const screenshotId: string = await api.screenshots.create({ project, encodedData });
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const screenshot: Screenshot = screenshots.find((i: Screenshot): boolean => i.id === screenshotId) as Screenshot;

    // test
    await api.screenshots.updateImageData({ project, screenshot, encodedData });

    // verify
    const updatedEncodedData: string = await downloadImageFile(`${screenshot.url}.orig`, 'image/png');
    expect(encodedData).toBe(updatedEncodedData);

    // clean
    await api.screenshots.delete({ project, screenshot });
  });

  test('api.screenshots.update', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');
    const screenshotId: string = await api.screenshots.create({ project, encodedData });
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const screenshot: Screenshot = screenshots.find((i: Screenshot): boolean => i.id === screenshotId) as Screenshot;
    const updateData: Omit<ScreenshotUpdateRequest, 'project' | 'screenshot'> = {
      comment: 'Hey! Nice screenshot.',
      tags: ['blue'],
    };

    // test
    await api.screenshots.update({ project, screenshot, ...updateData });

    // verify
    const updatedScreenshots: Screenshot[] = await api.screenshots.list({ project });
    const updatedScreenshot: Screenshot = updatedScreenshots
      .find((i: Screenshot): boolean => i.id === screenshotId) as Screenshot;
    expect(updatedScreenshot.comment).toBe('Hey! Nice screenshot.');

    // clean
    await api.screenshots.delete({ project, screenshot });
  });

  test('api.screenshots.delete', async (): Promise<void> => {
    // prepare
    const encodedData: string = readImageFile('./tests/__assets/screenshot.png', 'image/png');
    const screenshotId: string = await api.screenshots.create({ project, encodedData });

    // test
    await api.screenshots.delete({ project, screenshot: screenshotId });

    // verify
    const screenshots: Screenshot[] = await api.screenshots.list({ project });
    const recordExists: boolean = screenshots.some((i: Screenshot): boolean => i.id === screenshotId);
    expect(recordExists).toBe(false);
  });
});
