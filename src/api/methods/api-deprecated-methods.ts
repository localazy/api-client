import { AxiosRequestConfig } from 'axios';
import { ApiFiles } from '~/api/methods/api-files';
import { ApiFormats } from '~/api/methods/api-formats';
import { ApiGlossary } from '~/api/methods/api-glossary';
import { ApiImport } from '~/api/methods/api-import';
import { ApiKeys } from '~/api/methods/api-keys';
import { ApiProjects } from '~/api/methods/api-projects';
import { ApiScreenshots } from '~/api/methods/api-screenshots';
import { ApiWebhooks } from '~/api/methods/api-webhooks';
import { IHttpAdapter } from '~/http/i-http-adapter';
import { File } from '~/types/file';
import { FileGetContentsRequest } from '~/types/file-get-contents-request';
import { FileListKeysRequest } from '~/types/file-list-keys-request';
import { FilesListRequest } from '~/types/files-list-request';
import { Format } from '~/types/format';
import { I18nJson } from '~/types/i18n-json';
import { ImportJsonRequest } from '~/types/import-json-request';
import { Key } from '~/types/key';
import { KeyDeleteRequest } from '~/types/key-delete-request';
import { KeyUpdateRequest } from '~/types/key-update-request';
import { Project } from '~/types/project';
import { ProjectsListRequest } from '~/types/projects-list-request';
import { Screenshot } from '~/types/screenshot';
import { ScreenshotCreateRequest } from '~/types/screenshot-create-request';
import { ScreenshotDeleteRequest } from '~/types/screenshot-delete-request';
import { ScreenshotTag } from '~/types/screenshot-tag';
import { ScreenshotUpdateImageDataRequest } from '~/types/screenshot-update-image-data-request';
import { ScreenshotUpdateRequest } from '~/types/screenshot-update-request';
import { ScreenshotsListRequest } from '~/types/screenshots-list-request';
import { ScreenshotsListTagsRequest } from '~/types/screenshots-list-tags-request';
import { Webhook } from '~/types/webhook';
import { WebhooksGetSecretRequest } from '~/types/webhooks-get-secret-request';
import { WebhooksListRequest } from '~/types/webhooks-list-request';
import { WebhooksSecret } from '~/types/webhooks-secret';
import { WebhooksUpdateRequest } from '~/types/webhooks-update-request';

export abstract class ApiDeprecatedMethods {
  public abstract client: IHttpAdapter;

  public abstract projects: ApiProjects;

  public abstract import: ApiImport;

  public abstract formats: ApiFormats;

  public abstract files: ApiFiles;

  public abstract keys: ApiKeys;

  public abstract glossary: ApiGlossary;

  public abstract webhooks: ApiWebhooks;

  public abstract screenshots: ApiScreenshots;

  /**
   * List projects related to the project token.
   * @see https://localazy.com/docs/api/projects#list-projects
   */
  public async listProjects(request: ProjectsListRequest, config?: AxiosRequestConfig): Promise<Project[]> {
    return this.projects.list(request, config);
  }

  /**
   * Import content into Localazy.
   * @see https://localazy.com/docs/api/import#import-content-to-a-project
   */
  public async legacyImport(request: ImportJsonRequest, config?: AxiosRequestConfig): Promise<I18nJson> {
    return this.import.json(request, config);
  }

  /**
   * Retrieve list of available file formats and related options.
   * @see https://localazy.com/docs/api/import#list-available-file-types
   */
  public async listFormats(config?: AxiosRequestConfig): Promise<Format[]> {
    return this.formats.list(config);
  }

  /**
   * List Localazy files.
   * @see https://localazy.com/docs/api/files#list-files-in-project
   */
  public async listFiles(request: FilesListRequest, config?: AxiosRequestConfig): Promise<File[]> {
    return this.files.list(request, config);
  }

  /**
   * Returns the given file contents.
   * @see https://localazy.com/docs/api/files#list-file-content
   */
  public async getFileContents(request: FileGetContentsRequest, config?: AxiosRequestConfig): Promise<I18nJson> {
    return this.files.getContents(request, config);
  }

  /**
   * Retrieve list of keys for language from file.
   * @see https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file
   */
  public async listKeysInFileForLanguage(
    request: FileListKeysRequest,
    config?: AxiosRequestConfig,
  ): Promise<Key[]> {
    return this.files.listKeys(request, config);
  }

  /**
   * Retrieve list of webhooks for project.
   * @see https://localazy.com/docs/api/webhooks-api#list-webhooks-configuration
   */
  public async listWebhooks(request: WebhooksListRequest, config?: AxiosRequestConfig): Promise<Webhook[]> {
    return this.webhooks.list(request, config);
  }

  /**
   * Store a new webhooks configuration for the project.
   * @see https://localazy.com/docs/api/webhooks-api#update-webhooks-configuration
   */
  public async postWebhooks(request: WebhooksUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.webhooks.update(request, config);
  }

  /**
   * Return webhooks secret, can be used to verify webhook body
   * @see https://localazy.com/docs/api/webhooks-api#webhook-secrets
   */
  public async getWebhooksSecret(
    request: WebhooksGetSecretRequest,
    config?: AxiosRequestConfig,
  ): Promise<WebhooksSecret> {
    return this.webhooks.getSecret(request, config);
  }

  /**
   * Retrieve list of screenshots for project.
   * @see https://localazy.com/docs/api/screenshot-management#list-screenshots
   */
  public async listScreenshots(request: ScreenshotsListRequest, config?: AxiosRequestConfig): Promise<Screenshot[]> {
    return this.screenshots.list(request, config);
  }

  /**
   * Retrieve list of screenshots tags for project.
   * @see https://localazy.com/docs/api/screenshot-management#list-screenshots-tags
   */
  public async listScreenshotsTags(
    request: ScreenshotsListTagsRequest,
    config?: AxiosRequestConfig,
  ): Promise<ScreenshotTag[]> {
    return this.screenshots.listTags(request, config);
  }

  /**
   * Upload a new screenshot for the project.
   * @see https://localazy.com/docs/api/screenshot-management#create-a-new-screenshot
   */
  public async postScreenshots(request: ScreenshotCreateRequest, config?: AxiosRequestConfig): Promise<string> {
    return this.screenshots.create(request, config);
  }

  /**
   * Change image data of existing screenshot.
   * @see https://localazy.com/docs/api/screenshot-management#update-the-image-of-an-existing-screenshot
   */
  public async postScreenshot(request: ScreenshotUpdateImageDataRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.screenshots.updateImageData(request, config);
  }

  /**
   * Change existing screenshot (metadata).
   * @see https://localazy.com/docs/api/screenshot-management#update-an-existing-screenshot
   */
  public async putScreenshot(request: ScreenshotUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.screenshots.update(request, config);
  }

  /**
   * Delete existing screenshot
   * @see https://localazy.com/docs/api/screenshot-management#delete-a-screenshot
   */
  public async deleteScreenshot(request: ScreenshotDeleteRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.screenshots.delete(request, config);
  }

  /**
   * Update an existing key
   * @see https://localazy.com/docs/api/source-keys#update-source-key
   */
  public async updateKey(request: KeyUpdateRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.keys.update(request, config);
  }

  /**
   * Delete an existing key
   * @see https://localazy.com/docs/api/source-keys#delete-source-key
   */
  public async deleteKey(request: KeyDeleteRequest, config?: AxiosRequestConfig): Promise<void> {
    return this.keys.delete(request, config);
  }
}
