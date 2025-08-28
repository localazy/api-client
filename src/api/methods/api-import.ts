import { ApiBase } from '@/api/methods/api-base.js';
import type { File } from '@/types/file.js';
import type { I18nJson } from '@/types/i18n-json.js';
import { importDataFactory } from '@/types/import-data-factory.js';
import type { ImportDataFile } from '@/types/import-data-file.js';
import type { ImportData } from '@/types/import-data.js';
import type { ImportJsonRequest } from '@/types/import-json-request.js';
import type { ImportProgressRequest } from '@/types/import-progress-request.js';
import type { Project } from '@/types/project.js';
import type { RequestConfig } from '@/types/request-config.js';
import type { UploadSessionStatus } from '@/types/upload-session-status.js';
import { delay } from '@/utils/delay.js';
import { JsonUtils } from '@/utils/json-utils.js';

export class ApiImport extends ApiBase {
  /**
   * Import source keys from JSON object.
   *
   * @param request Import JSON request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/import#import-content-to-a-project  Localazy API Docs}
   */
  public async json(
    request: ImportJsonRequest,
    config?: RequestConfig,
  ): Promise<ReturnType<ApiImport['getImportedFile']>> {
    const { project, json }: ImportJsonRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const chunks: I18nJson[] = JsonUtils.slice(json);
    const data: ImportData = importDataFactory(request, chunks);

    const { result }: { result: string } = (await this.api.client.post(
      `/projects/${projectId}/import`,
      data,
      config,
    )) as { result: string };

    await delay();

    return this.getImportedFile(project, data, result);
  }

  /**
   * Get progress of the import session.
   *
   * @param request Import session progress request.
   * @param config Request config.
   *
   * Not available in the Localazy API Docs yet.
   */
  public async getProgress(
    request: ImportProgressRequest,
    config?: RequestConfig,
  ): Promise<UploadSessionStatus> {
    const { project, importBatch }: ImportProgressRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');

    return (await this.api.client.get(
      `/projects/${projectId}/import/${importBatch}`,
      config,
    )) as UploadSessionStatus;
  }

  protected async getImportedFile(
    project: string | Project,
    data: ImportData,
    importBatch: string,
  ): Promise<File & { importBatch: string }> {
    const files: File[] = await this.api.files.list({ project });
    const file: File | undefined = files.find((f: File): boolean =>
      data.files.some(
        (importFile: ImportDataFile): boolean =>
          f.name === (importFile.name || 'content.json') && f.path === importFile.path,
      ),
    );

    return {
      ...file,
      importBatch,
    } as File & { importBatch: string };
  }
}
