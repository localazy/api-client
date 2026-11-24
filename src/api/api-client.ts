import { ApiAi } from '@/api/methods/api-ai.js';
import { ApiExport } from '@/api/methods/api-export.js';
import { ApiFiles } from '@/api/methods/api-files.js';
import { ApiFormats } from '@/api/methods/api-formats.js';
import { ApiGlossary } from '@/api/methods/api-glossary.js';
import { ApiImport } from '@/api/methods/api-import.js';
import { ApiKeys } from '@/api/methods/api-keys.js';
import { ApiProjects } from '@/api/methods/api-projects.js';
import { ApiScreenshots } from '@/api/methods/api-screenshots.js';
import { ApiSuggestions } from '@/api/methods/api-suggestions.js';
import { ApiWebhooks } from '@/api/methods/api-webhooks.js';
import { ApiOrganizations } from '@/api/methods/api-organizations.js';
import { ApiLanguages } from '@/api/methods/api-languages.js';
import { ApiBranches } from '@/api/methods/api-branches.js';
import { ApiComments } from '@/api/methods/api-comments.js';
import { ApiLinks } from '@/api/methods/api-links.js';
import { ApiSegmentation } from '@/api/methods/api-segmentation.js';
import { ApiTags } from '@/api/methods/api-tags.js';
import { ApiStyleguides } from '@/api/methods/api-styleguides.js';
import { ApiCdn } from '@/api/methods/api-cdn.js';
import { FetchHttpAdapter } from '@/http/fetch-http-adapter.js';
import type { IHttpAdapter } from '@/http/i-http-adapter.js';
import type { ApiClientOptions } from '@/types/api-client-options.js';

export class ApiClient {
  public client: IHttpAdapter;

  public ai: ApiAi;

  public projects: ApiProjects;

  public import: ApiImport;

  public export: ApiExport;

  public formats: ApiFormats;

  public files: ApiFiles;

  public keys: ApiKeys;

  public glossary: ApiGlossary;

  public webhooks: ApiWebhooks;

  public screenshots: ApiScreenshots;

  public suggestions: ApiSuggestions;

  public organizations: ApiOrganizations;

  public languages: ApiLanguages;

  public branches: ApiBranches;

  public comments: ApiComments;

  public links: ApiLinks;

  public segmentation: ApiSegmentation;

  public tags: ApiTags;

  public styleguides: ApiStyleguides;

  public cdn: ApiCdn;

  constructor(options: ApiClientOptions) {
    this.client = new FetchHttpAdapter(options);

    this.ai = new ApiAi(this);
    this.projects = new ApiProjects(this);
    this.import = new ApiImport(this);
    this.export = new ApiExport(this);
    this.formats = new ApiFormats(this);
    this.files = new ApiFiles(this);
    this.keys = new ApiKeys(this);
    this.glossary = new ApiGlossary(this);
    this.webhooks = new ApiWebhooks(this);
    this.screenshots = new ApiScreenshots(this);
    this.suggestions = new ApiSuggestions(this);
    this.organizations = new ApiOrganizations(this);
    this.languages = new ApiLanguages(this);
    this.branches = new ApiBranches(this);
    this.comments = new ApiComments(this);
    this.links = new ApiLinks(this);
    this.segmentation = new ApiSegmentation(this);
    this.tags = new ApiTags(this);
    this.styleguides = new ApiStyleguides(this);
    this.cdn = new ApiCdn(this);
  }
}
