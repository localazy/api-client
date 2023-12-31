import { AxiosRequestConfig } from 'axios';
import { ApiBase } from '~/api/methods/api-base';
import { File } from '~/types/file';
import { I18nJson } from '~/types/i18n-json';
import { ImportData } from '~/types/import-data';
import { importDataFactory } from '~/types/import-data-factory';
import { ImportDataFile } from '~/types/import-data-file';
import { ImportJsonRequest } from '~/types/import-json-request';
import { Project } from '~/types/project';
import { delay } from '~/utils/delay';
import { JsonUtils } from '~/utils/json-utils';

export class ApiImport extends ApiBase {
  /**
   * Import source keys from JSON object.
   *
   * @param request Import JSON request config.
   * @param config Axios request config.
   *
   * @see {@link https://localazy.com/docs/api/import#import-content-to-a-project  Localazy API Docs}
   */
  public async json(request: ImportJsonRequest, config?: AxiosRequestConfig): Promise<File> {
    const {
      project,
      json,
    }: ImportJsonRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const chunks: I18nJson[] = JsonUtils.slice(json);
    const data: ImportData = importDataFactory(request, chunks);

    const { result } = await this.api.client.post(`/projects/${projectId}/import`, data, config);

    await delay();

    return this.getImportedFile(project, data, result);
  }

  protected async getImportedFile(project: string | Project, data: ImportData, importBatch: string): Promise<File> {
    const files: File[] = await this.api.files.list({ project });
    const file: File | undefined = files
      .find((f: File): boolean => data.files.some(
        (importFile: ImportDataFile): boolean => f.name === importFile.name && f.path === importFile.path,
      ));

    return {
      ...file,
      importBatch,
    } as File & { importBatch: string };
  }
}
