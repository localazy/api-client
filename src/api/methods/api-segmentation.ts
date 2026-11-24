import { ApiBase } from '@/api/methods/api-base.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { SegmentationGetParentRequest } from '@/types/segmentation-get-parent-request.js';
import type { SegmentationParent } from '@/types/segmentation-parent.js';

export class ApiSegmentation extends ApiBase {
  /**
   * Get a text-segmentation {@link SegmentationParent  parent}: the key a set of segments reassembles
   * into, with its segment IDs and the whole text in `lang`. Turns the `segParentId` of a segment
   * back into its key.
   *
   * An unknown ID, a parent of another project and a project without segmentation all reject with
   * `unauthorized`; a malformed ID rejects with `invalid_id` and an unknown `lang` with
   * `unknown_lang`.
   *
   * @param request Segmentation get parent request config.
   * @param config Request config.
   */
  public async getParent(
    request: SegmentationGetParentRequest,
    config?: RequestConfig,
  ): Promise<SegmentationParent> {
    const { project, parent, lang }: SegmentationGetParentRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const parentId: string = ApiBase.getId(parent, 'parent');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));

    return (await this.api.client.get(
      `/projects/${projectId}/segmentation/parents/${parentId}/${locale}`,
      config,
    )) as SegmentationParent;
  }
}
