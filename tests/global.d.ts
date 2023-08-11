// noinspection ES6ConvertVarToLetConst
/* eslint-disable no-var,vars-on-top */

import { ApiClient, Project } from '~/main';

declare global {
  var api: ApiClient;
  var project: Project;
}
