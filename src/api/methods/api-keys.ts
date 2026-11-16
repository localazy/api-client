import { ApiBase } from '@/api/methods/api-base.js';
import type { KeyDeleteRequest } from '@/types/key-delete-request.js';
import type { KeyDeprecateRequest } from '@/types/key-deprecate-request.js';
import type { KeyRenameRequest } from '@/types/key-rename-request.js';
import type { KeyRenameResponse } from '@/types/key-rename-response.js';
import type { KeySetMetadataRequest } from '@/types/key-set-metadata-request.js';
import type { KeySetMetadataResponse } from '@/types/key-set-metadata-response.js';
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
   * Add and/or remove entries of the custom metadata of {@link Key  keys}, each key with its own change.
   *
   * Each top-level entry of `addMetadata` replaces the entry of the same name and keeps all others.
   * Removal is applied before addition, so a name present in both `addMetadata` and `removeMetadata`
   * ends up added. Nothing else about the keys changes.
   *
   * At most 1000 keys may be passed per call, each listed once and each adding or removing something;
   * a request that breaks these rules is rejected and changes nothing. Otherwise every key gets its own
   * `state` in the response: a key that is missing (`not_found`) or cannot take metadata
   * (`not_supported`: cluster-qualified IDs and single segments of segmented keys) does not stop the
   * others.
   *
   * @param request Key set metadata request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#update-metadata-of-multiple-keys  Localazy API Docs}
   */
  public async setMetadata(
    request: KeySetMetadataRequest,
    config?: RequestConfig,
  ): Promise<KeySetMetadataResponse> {
    const { project, keys }: KeySetMetadataRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    if (!Array.isArray(keys)) {
      throw new TypeError('Invalid key list: an array is required.');
    }

    return (await this.api.client.put(
      `/projects/${projectId}/keys/metadata`,
      { keys: keys.map(({ key, ...change }) => ({ id: ApiBase.getId(key, 'key'), ...change })) },
      config,
    )) as KeySetMetadataResponse;
  }

  /**
   * Rename {@link Key  keys}: give each key a new name, keeping its ID, translations and their
   * history, comments, screenshots, tags and other settings. The key stays in its file and keeps its
   * kind (a plural key stays plural).
   *
   * At most 1000 keys may be passed per call, each listed once. The whole request is checked before
   * anything is written: if one entry can't be applied, it's rejected and no key is renamed. A new
   * name must not be used by another key of the same file, deprecated keys included; keys may swap
   * names within one call. Each key gets its `state` in the response: `renamed`, or `unchanged` when
   * it already had that name, so repeating a call is safe.
   *
   * Rejected: segmented keys, keys of files that use key clustering, keys of document formats that
   * Localazy exports by filling in the uploaded document, and keys imported from XLIFF. A missing or
   * deleted key fails with `401`. The call also fails while an import runs in the project
   * (`import_in_progress`) or another rename runs there (`409`); retry when it finishes.
   *
   * Downloads and the CDN get the new names with the project's next publish. Rename the keys in your
   * source files too: an import of the old name creates it again as a new key.
   *
   * @param request Key rename request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#rename-keys  Localazy API Docs}
   */
  public async rename(
    request: KeyRenameRequest,
    config?: RequestConfig,
  ): Promise<KeyRenameResponse> {
    const { project, keys }: KeyRenameRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    if (!Array.isArray(keys)) {
      throw new TypeError('Invalid key list: an array is required.');
    }

    return (await this.api.client.post(
      `/projects/${projectId}/keys/rename`,
      { keys: keys.map(({ key, name }) => ({ id: ApiBase.getId(key, 'key'), key: name })) },
      config,
    )) as KeyRenameResponse;
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
