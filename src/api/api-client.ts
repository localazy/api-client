import { ApiExport } from '@/api/methods/api-export.js';
import { ApiFiles } from '@/api/methods/api-files.js';
import { ApiFormats } from '@/api/methods/api-formats.js';
import { ApiGlossary } from '@/api/methods/api-glossary.js';
import { ApiImport } from '@/api/methods/api-import.js';
import { ApiKeys } from '@/api/methods/api-keys.js';
import { ApiProjects } from '@/api/methods/api-projects.js';
import { ApiScreenshots } from '@/api/methods/api-screenshots.js';
import { ApiWebhooks } from '@/api/methods/api-webhooks.js';
import { FetchHttpAdapter } from '@/http/fetch-http-adapter.js';
import type { IHttpAdapter } from '@/http/i-http-adapter.js';
import type { ApiClientOptions } from '@/types/api-client-options.js';

export class ApiClient {
  public client: IHttpAdapter;

  public projects: ApiProjects;

  public import: ApiImport;

  public export: ApiExport;

  public formats: ApiFormats;

  public files: ApiFiles;

  public keys: ApiKeys;

  public glossary: ApiGlossary;

  public webhooks: ApiWebhooks;

  public screenshots: ApiScreenshots;

  constructor(options: ApiClientOptions) {
    this.client = new FetchHttpAdapter(options);

    this.projects = new ApiProjects(this);
    this.import = new ApiImport(this);
    this.export = new ApiExport(this);
    this.formats = new ApiFormats(this);
    this.files = new ApiFiles(this);
    this.keys = new ApiKeys(this);
    this.glossary = new ApiGlossary(this);
    this.webhooks = new ApiWebhooks(this);
    this.screenshots = new ApiScreenshots(this);
  }
}
