import { CreateAxiosDefaults } from 'axios';
import { ApiExport } from '~/api/methods/api-export';
import { ApiFiles } from '~/api/methods/api-files';
import { ApiFormats } from '~/api/methods/api-formats';
import { ApiGlossary } from '~/api/methods/api-glossary';
import { ApiImport } from '~/api/methods/api-import';
import { ApiKeys } from '~/api/methods/api-keys';
import { ApiProjects } from '~/api/methods/api-projects';
import { ApiScreenshots } from '~/api/methods/api-screenshots';
import { ApiWebhooks } from '~/api/methods/api-webhooks';
import { AxiosHttpAdapter } from '~/http/axios-http-adapter';
import { IHttpAdapter } from '~/http/i-http-adapter';
import { ApiClientOptions } from '~/types/api-client-options';

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

  constructor(options: ApiClientOptions, config?: CreateAxiosDefaults) {
    this.client = new AxiosHttpAdapter(options, config);

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
