import { AxiosRequestConfig, AxiosResponseTransformer } from 'axios';
import { ApiBase } from '~/api/methods/api-base';
import { Screenshot } from '~/types/screenshot';
import { ScreenshotCreateRequest } from '~/types/screenshot-create-request';
import { ScreenshotDeleteRequest } from '~/types/screenshot-delete-request';
import { ScreenshotTag } from '~/types/screenshot-tag';
import { ScreenshotUpdateImageDataRequest } from '~/types/screenshot-update-image-data-request';
import { ScreenshotUpdateRequest } from '~/types/screenshot-update-request';
import { ScreenshotsListRequest } from '~/types/screenshots-list-request';
import { ScreenshotsListTagsRequest } from '~/types/screenshots-list-tags-request';

export class ApiScreenshots extends ApiBase {
  /**
   * List all {@link Screenshot  screenshots} in the project.
   *
   * @param request Screenshots list request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#list-screenshots  Localazy API Docs}
   */
  public async list(request: ScreenshotsListRequest, config?: AxiosRequestConfig): Promise<Screenshot[]> {
    const { project }: ScreenshotsListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return this.api.client.get(`/projects/${projectId}/screenshots`, config);
  }

  /**
   * List all {@link ScreenshotTag  screenshots tags} in the project.
   *
   * @param request Screenshots list tags request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#list-screenshots-tags  Localazy API Docs}
   */
  public async listTags(request: ScreenshotsListTagsRequest, config?: AxiosRequestConfig): Promise<ScreenshotTag[]> {
    const { project }: ScreenshotsListTagsRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return this.api.client.get(`/projects/${projectId}/screenshots/tags`, config);
  }

  /**
   * Create {@link Screenshot  screenshot}.
   *
   * @param request Screenshot create request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#create-a-new-screenshot  Localazy API Docs}
   */
  public async create(request: ScreenshotCreateRequest, config?: AxiosRequestConfig): Promise<string> {
    const { project }: ScreenshotCreateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const transformResponse: AxiosResponseTransformer = (d: string): string => {
      const json: { id: string } = JSON.parse(d);
      return json.id;
    };

    return this.api.client.post(
      `/projects/${projectId}/screenshots`,
      request.encodedData,
      { transformResponse, ...config },
    );
  }

  /**
   * Update the image data of {@link Screenshot  screenshot}.
   *
   * @param request Screenshot update image data request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#update-the-image-of-an-existing-screenshot
   * | Localazy API Docs}
   */
  public async updateImageData(request: ScreenshotUpdateImageDataRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, screenshot }: ScreenshotUpdateImageDataRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const screenshotId: string = ApiBase.getId(screenshot, 'screenshot');

    await this.api.client.post(
      `/projects/${projectId}/screenshots/${screenshotId}`,
      request.encodedData,
      config,
    );
  }

  /**
   * Update {@link Screenshot  screenshot}.
   * Image data are updated with `screenshots.updateImageData`.
   *
   * @param request Screenshot update request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#update-an-existing-screenshot  Localazy API Docs}
   */
  public async update(request: ScreenshotUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, screenshot, ...data }: ScreenshotUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const screenshotId: string = ApiBase.getId(screenshot, 'screenshot');

    await this.api.client.put(`/projects/${projectId}/screenshots/${screenshotId}`, data, config);
  }

  /**
   * Delete {@link Screenshot  screenshot}.
   *
   * @param request Screenshot delete request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/screenshot-management#delete-a-screenshot  Localazy API Docs}
   */
  public async delete(request: ScreenshotDeleteRequest, config?: AxiosRequestConfig): Promise<void> {
    const { project, screenshot }: ScreenshotDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const screenshotId: string = ApiBase.getId(screenshot, 'screenshot');

    await this.api.client.delete(`/projects/${projectId}/screenshots/${screenshotId}`, config);
  }
}
