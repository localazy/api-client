import { ApiBase } from '@/api/methods/api-base.js';
import type { BooleanResult } from '@/types/boolean-result.js';
import type { LanguageAddResponse } from '@/types/language-add-response.js';
import type { LanguageCopyRequest } from '@/types/language-copy-request.js';
import type { LanguageCopyResponse } from '@/types/language-copy-response.js';
import type { LanguageDeleteRequest } from '@/types/language-delete-request.js';
import type { LanguageDisableResponse } from '@/types/language-disable-response.js';
import type { LanguageEnableResponse } from '@/types/language-enable-response.js';
import type { LanguageHideResponse } from '@/types/language-hide-response.js';
import type { LanguageKey } from '@/types/language-key.js';
import type { LanguageKeysPaginated } from '@/types/language-keys-paginated.js';
import type { LanguageListKeysRequest } from '@/types/language-list-keys-request.js';
import type { LanguageReplaceRequest } from '@/types/language-replace-request.js';
import type { LanguageSetFallbackRequest } from '@/types/language-set-fallback-request.js';
import type { LanguagesBatchRequest } from '@/types/languages-batch-request.js';
import type { Plurals } from '@/types/plurals.js';
import type { PluralsListRequest } from '@/types/plurals-list-request.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiLanguages extends ApiBase {
  /**
   * Add target languages to the project. They are added empty: nothing is translated and no publish
   * is triggered. A hidden language comes back with its translations, as `restored`.
   *
   * Only resolving the languages is all-or-nothing; a failure part-way through adding them can leave
   * the earlier ones added. Repeating the call is safe.
   *
   * @param request Languages batch request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#add-languages  Localazy API Docs}
   */
  public async add(
    request: LanguagesBatchRequest,
    config?: RequestConfig,
  ): Promise<LanguageAddResponse> {
    return (await this.postBatch('', request, config)) as LanguageAddResponse;
  }

  /**
   * Hide languages: they leave the project but keep their translations, which come back when the
   * language is added again. Use {@link ApiLanguages.delete} to remove the translations too.
   *
   * @param request Languages batch request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#hide-languages  Localazy API Docs}
   */
  public async hide(
    request: LanguagesBatchRequest,
    config?: RequestConfig,
  ): Promise<LanguageHideResponse> {
    return (await this.postBatch('/hide', request, config)) as LanguageHideResponse;
  }

  /**
   * Include languages when the project is published. Adding a hidden language back also enables it.
   *
   * @param request Languages batch request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#enable-and-disable-publishing
   * | Localazy API Docs}
   */
  public async enable(
    request: LanguagesBatchRequest,
    config?: RequestConfig,
  ): Promise<LanguageEnableResponse> {
    return (await this.postBatch('/enable', request, config)) as LanguageEnableResponse;
  }

  /**
   * Leave languages out when the project is published. They stay in the project and translatable,
   * but their "new strings" and "to review" e-mails stop.
   *
   * @param request Languages batch request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#enable-and-disable-publishing
   * | Localazy API Docs}
   */
  public async disable(
    request: LanguagesBatchRequest,
    config?: RequestConfig,
  ): Promise<LanguageDisableResponse> {
    return (await this.postBatch('/disable', request, config)) as LanguageDisableResponse;
  }

  /**
   * Permanently delete a language **and all of its translations**; there is no undo. Use
   * {@link ApiLanguages.hide} to keep the translations.
   *
   * Runs while the request is open, so it is slow on large projects. Fails with `409` while another
   * delete, copy or replace runs in the project, or while another language falls back to this one.
   *
   * @param request Language delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#delete-a-language  Localazy API Docs}
   */
  public async delete(
    request: LanguageDeleteRequest,
    config?: RequestConfig,
  ): Promise<BooleanResult> {
    const { project, lang }: LanguageDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));

    return (await this.api.client.delete(
      `/projects/${projectId}/languages/${locale}`,
      config,
    )) as BooleanResult;
  }

  /**
   * Add a language pre-filled with a snapshot of another one's translations, e.g. `pt_BR` into
   * `pt_PT`.
   *
   * If `to` is hidden, its kept translations are destroyed first and stay destroyed even when the
   * copy then fails.
   *
   * @param request Language copy request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#copy-a-language  Localazy API Docs}
   */
  public async copy(
    request: LanguageCopyRequest,
    config?: RequestConfig,
  ): Promise<LanguageCopyResponse> {
    const { project, from, to }: LanguageCopyRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.post(
      `/projects/${projectId}/languages/copy`,
      { from: ApiBase.requireLang(from, 'from'), to: ApiBase.requireLang(to, 'to') },
      config,
    )) as LanguageCopyResponse;
  }

  /**
   * Move all translations of `language` to `replaceWith`, e.g. `de` to `de_AT`. `language` stops
   * existing and `replaceWith` takes over its state, publish flag and fallbacks included.
   *
   * Fails with `409` while another delete, copy or replace runs in the project, or when the move
   * would make a cycle of fallback languages.
   *
   * @param request Language replace request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#replace-a-language  Localazy API Docs}
   */
  public async replace(
    request: LanguageReplaceRequest,
    config?: RequestConfig,
  ): Promise<BooleanResult> {
    const { project, language, replaceWith }: LanguageReplaceRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.post(
      `/projects/${projectId}/languages/replace`,
      {
        language: ApiBase.requireLang(language, 'language'),
        replaceWith: ApiBase.requireLang(replaceWith, 'replaceWith'),
      },
      config,
    )) as BooleanResult;
  }

  /**
   * Set or remove (`fallback: null`) the fallback language of a language. Fallbacks chain and end at
   * the source language, apply only to file outputs, and each change publishes the project again.
   *
   * Setting one fails with `unpaid` when the organization lacks the feature; removing always works.
   *
   * @param request Language set fallback request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-languages#set-a-fallback-language
   * | Localazy API Docs}
   */
  public async setFallback(
    request: LanguageSetFallbackRequest,
    config?: RequestConfig,
  ): Promise<BooleanResult> {
    const { project, lang, fallback }: LanguageSetFallbackRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));

    return (await this.api.client.put(
      `/projects/${projectId}/languages/${locale}/fallback`,
      { fallback: fallback === null ? null : ApiBase.requireLang(fallback, 'fallback') },
      config,
    )) as BooleanResult;
  }

  /**
   * List all {@link LanguageKey  keys} of all files of the project with their values in one language.
   * Each key has its `file`; use {@link ApiLanguages.listKeysPage} to also get the file descriptions.
   *
   * @param request Language list keys request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-keys-of-all-files  Localazy API Docs}
   */
  public async listKeys(
    request: LanguageListKeysRequest,
    config?: RequestConfig,
  ): Promise<LanguageKey[]> {
    const keys: LanguageKey[] = [];
    let next: string | undefined = request.next;

    do {
      const page: LanguageKeysPaginated = await this.listKeysPage({ ...request, next }, config);
      keys.push(...page.keys);
      next = page.next;
    } while (next);

    return keys;
  }

  /**
   * List one page of {@link LanguageKey  keys} of all files of the project with their values in one
   * language. `files` describes the files of the keys on the page.
   *
   * @param request Language list keys request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/files#list-keys-of-all-files  Localazy API Docs}
   */
  public async listKeysPage(
    request: LanguageListKeysRequest,
    config?: RequestConfig,
  ): Promise<LanguageKeysPaginated> {
    const { project, lang, ...query }: LanguageListKeysRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));
    const params: Record<string, string> = { ...config?.params };
    for (const [name, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') {
        params[name] = String(value);
      }
    }

    return (await this.api.client.get(
      `/projects/${projectId}/languages/${locale}/keys`,
      Object.keys(params).length > 0 ? { ...config, params } : config,
    )) as LanguageKeysPaginated;
  }

  /**
   * Get the plural rules the project defines and the plural forms each project language uses as a
   * result, i.e. which forms a plural value needs in each language.
   *
   * @param request Plurals list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/project-styleguides-plurals#get-plurals
   * | Localazy API Docs}
   */
  public async listPlurals(request: PluralsListRequest, config?: RequestConfig): Promise<Plurals> {
    const projectId: string = ApiBase.getId(request.project, 'project');

    return (await this.api.client.get(`/projects/${projectId}/plurals`, config)) as Plurals;
  }

  protected async postBatch(
    path: string,
    request: LanguagesBatchRequest,
    config?: RequestConfig,
  ): Promise<object | string | Blob> {
    const { project, languages }: LanguagesBatchRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    if (!Array.isArray(languages)) {
      throw new TypeError('Invalid language list: an array is required.');
    }

    return this.api.client.post(
      `/projects/${projectId}/languages${path}`,
      { languages: languages.map((lang) => ApiBase.requireLang(lang, 'lang')) },
      config,
    );
  }
}
