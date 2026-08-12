import { ApiBase } from '@/api/methods/api-base.js';
import type { AiSuggestionsResponse } from '@/types/ai-suggestions-response.js';
import type { MtSuggestionsResponse } from '@/types/mt-suggestions-response.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { SuggestionsRequest } from '@/types/suggestions-request.js';
import type { TmSuggestionsResponse } from '@/types/tm-suggestions-response.js';

export class ApiSuggestions extends ApiBase {
  /**
   * Translation Memory (InTM) suggestions for a single key.
   *
   * `to` is required. `from` overrides the source language the suggestions are
   * computed from and defaults to the project's source language. Both accept a
   * locale code or Localazy's numeric language id.
   *
   * Read the response deliberately: `enabled: false` means Translation Memory
   * could not run for this project or language, whereas `enabled: true` with
   * empty `items` means it ran and found nothing. `errors` carries soft
   * failures keyed by engine and never fails the request.
   *
   * @param request Suggestions request config.
   * @param config Request config. Its `params` are preserved; the `to`/`from`
   * language parameters are merged over them.
   */
  public async tm(
    request: SuggestionsRequest,
    config?: RequestConfig,
  ): Promise<TmSuggestionsResponse> {
    return (await this.api.client.get(ApiSuggestions.suggestionsUrl(request, 'tm'), {
      ...config,
      params: ApiSuggestions.langParams(request, config),
    })) as TmSuggestionsResponse;
  }

  /**
   * Machine Translation suggestions for a single key.
   *
   * `to` is required. `from` overrides the source language the suggestions are
   * computed from and defaults to the project's source language. Both accept a
   * locale code or Localazy's numeric language id.
   *
   * `enabled` reflects only the project's own Machine Translation switch (and
   * that the target is not the source).
   * `errors` carries soft failures keyed by engine — an exhausted quota or a
   * timed-out engine — and never fails the request.
   *
   * @param request Suggestions request config.
   * @param config Request config. Its `params` are preserved; the `to`/`from`
   * language parameters are merged over them.
   */
  public async mt(
    request: SuggestionsRequest,
    config?: RequestConfig,
  ): Promise<MtSuggestionsResponse> {
    return (await this.api.client.get(ApiSuggestions.suggestionsUrl(request, 'mt'), {
      ...config,
      params: ApiSuggestions.langParams(request, config),
    })) as MtSuggestionsResponse;
  }

  /**
   * Localazy AI suggestions for a single key.
   *
   * This method **spends AI credits** — that is why the underlying endpoint is
   * a `POST` rather than a `GET`.
   *
   * `to` is required. `from` overrides the source language the suggestions are
   * computed from and defaults to the project's source language. Both accept a
   * locale code or Localazy's numeric language id. Because this is a `POST`,
   * the languages travel in the body and `config.params` is not sent.
   *
   * `enabled` requires both AI suggestions and Machine Translation to be
   * switched on in the project's settings; producing results additionally
   * requires an active paid MT tier, so `enabled: true` can still yield empty
   * `items` with no error. `errors` carries soft failures keyed by engine,
   * including depleted credits, and never fails the request.
   *
   * Not to be confused with {@link ApiAi.translate}, which translates arbitrary
   * texts you supply rather than an existing key.
   *
   * @param request Suggestions request config.
   * @param config Request config.
   */
  public async ai(
    request: SuggestionsRequest,
    config?: RequestConfig,
  ): Promise<AiSuggestionsResponse> {
    return (await this.api.client.post(
      ApiSuggestions.suggestionsUrl(request, 'ai'),
      ApiSuggestions.langParams(request),
      config,
    )) as AiSuggestionsResponse;
  }

  protected static suggestionsUrl(request: SuggestionsRequest, family: string): string {
    const { project, key }: SuggestionsRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');

    return `/projects/${projectId}/keys/${keyId}/suggestions/${family}`;
  }

  /**
   * Builds the language query parameters, merged over whichever parameters the
   * caller supplied in `config.params` (a `Record<string, string>`, or omitted
   * entirely).
   *
   * `to` always wins over a caller-supplied `to`. `from` is written only when
   * the request actually specifies it, so a caller-supplied `from` survives
   * when the request omits one — and, more importantly, a `null` or `undefined`
   * `from` is left out rather than coerced to the literal string `"null"` /
   * `"undefined"`, which the API would reject as an unknown language instead of
   * falling back to the project's source language.
   */
  protected static langParams(
    request: SuggestionsRequest,
    config?: RequestConfig,
  ): Record<string, string> {
    const { to, from }: SuggestionsRequest = request;

    return {
      ...config?.params,
      to: ApiBase.requireLang(to, 'to'),
      ...(from === undefined || from === null ? {} : { from: String(from) }),
    };
  }
}
