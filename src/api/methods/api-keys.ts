import { ApiBase } from '@/api/methods/api-base.js';
import type { KeyDeleteRequest } from '@/types/key-delete-request.js';
import type { KeyDeprecateRequest } from '@/types/key-deprecate-request.js';
import type { KeySetPriorityRequest } from '@/types/key-set-priority-request.js';
import type { KeySetTagsRequest } from '@/types/key-set-tags-request.js';
import type { KeySubmitTranslationRequest } from '@/types/key-submit-translation-request.js';
import type { KeyUpdateRequest } from '@/types/key-update-request.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { BooleanResult } from '@/types/boolean-result.js';
import { normalizeTranslationValue } from '@/utils/translation-value-utils.js';
import type { SubmitTranslationResponse } from '@/types/submit-translation-response.js';

export class ApiKeys extends ApiBase {
  /**
   * Update {@link Key  key}.
   *
   * @param request Key update request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#update-source-key  Localazy API Docs}
   */
  public async update(request: KeyUpdateRequest, config?: RequestConfig): Promise<void> {
    const { project, key, ...data }: KeyUpdateRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    await this.api.client.put(`/projects/${projectId}/keys/${keyId}`, data, config);
  }

  /**
   * Delete {@link Key  key}.
   *
   * @param request Key delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#delete-source-key  Localazy API Docs}
   */
  public async delete(request: KeyDeleteRequest, config?: RequestConfig): Promise<void> {
    const { project, key }: KeyDeleteRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    await this.api.client.delete(`/projects/${projectId}/keys/${keyId}`, config);
  }

  /**
   * Deprecate keys.
   *
   * @param request Key deprecate request config.
   * @param config Request config.
   */
  public async deprecate(request: KeyDeprecateRequest, config?: RequestConfig): Promise<void> {
    const { project, phrases }: KeyDeprecateRequest = request;

    const localPhrases: string[] = phrases.map((phrase) => {
      if (typeof phrase === 'object' && 'id' in phrase) {
        return phrase.id;
      }

      if (typeof phrase === 'string') {
        return phrase;
      }

      return phrase;
    });
    const projectId: string = ApiBase.getId(project, 'project');

    await this.api.client.post(
      `/projects/${projectId}/keys/deprecate`,
      { phrases: localPhrases },
      config,
    );
  }

  /**
   * Submit a translation for a single {@link Key  key} in one target language.
   *
   * `value` must match the key's form: a string for a singular key, an array of
   * strings for an array key, or an object keyed by CLDR plural class for a
   * plural key. Submitting a shape that does not match the key is rejected.
   *
   * Plural values may use either the plain classes the write API expects
   * (`{ one: '1 item' }`) or the `@`-prefixed form the read API returns
   * (`{ '@one': '1 item' }`) — the prefix is stripped for you, so a value taken
   * straight from `files.listKeys()` round-trips correctly.
   *
   * `lang` accepts a locale code or Localazy's numeric language id, and is
   * URL-escaped, so script-qualified locales such as `zh#Hans` are transmitted
   * intact.
   *
   * **Check `result` on the response.** The API answers HTTP 200 with
   * `result: false` and a `message` when a submission is deliberately not
   * applied — the target is the project's source language, the project is
   * momentarily locked by a running import, or the translation could not be
   * stored. None of those reject the promise.
   *
   * @param request Key submit translation request config.
   * @param config Request config.
   */
  public async submitTranslation(
    request: KeySubmitTranslationRequest,
    config?: RequestConfig,
  ): Promise<SubmitTranslationResponse> {
    const { project, key, lang, value }: KeySubmitTranslationRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));

    return (await this.api.client.post(
      `/projects/${projectId}/keys/${keyId}/translations/${locale}`,
      { value: normalizeTranslationValue(value) },
      config,
    )) as SubmitTranslationResponse;
  }

  /**
   * Add and/or remove tags on {@link Key  keys}.
   *
   * Removal is applied before addition, so a tag name present in both
   * `addTags` and `removeTags` ends up added. Tag names that do not exist yet
   * are created, subject to the project's 50-tag limit. Applying tags is not
   * atomic across tag names.
   *
   * At most 1000 keys may be passed per call; larger sets are rejected outright
   * rather than truncated, and splitting them is the caller's responsibility.
   *
   * `result` reports that the request was processed, not that it changed
   * anything: key ids that do not resolve within the project are skipped
   * silently, and a call in which none of them resolve still answers `true`.
   *
   * @param request Key set tags request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#set-tags-on-multiple-keys  Localazy API Docs}
   */
  public async setTags(request: KeySetTagsRequest, config?: RequestConfig): Promise<BooleanResult> {
    const { project, keys, ...data }: KeySetTagsRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.put(
      `/projects/${projectId}/keys/tags`,
      { keys: ApiBase.getIds(keys, 'key'), ...data },
      config,
    )) as BooleanResult;
  }

  /**
   * Set the priority level on {@link Key  keys}.
   *
   * `normal` clears any priority currently set.
   *
   * At most 1000 keys may be passed per call; larger sets are rejected outright
   * rather than truncated, and splitting them is the caller's responsibility.
   *
   * `result` reports that the request was processed, not that it changed
   * anything: key ids that do not resolve within the project are skipped
   * silently, and a call in which none of them resolve still answers `true`.
   *
   * @param request Key set priority request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#set-priority-on-multiple-keys  Localazy API Docs}
   */
  public async setPriority(
    request: KeySetPriorityRequest,
    config?: RequestConfig,
  ): Promise<BooleanResult> {
    const { project, keys, priority }: KeySetPriorityRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.put(
      `/projects/${projectId}/keys/priority`,
      { keys: ApiBase.getIds(keys, 'key'), priority },
      config,
    )) as BooleanResult;
  }
}
