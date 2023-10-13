# Migration guide from `ts-api@1.x.x` to `api-client@2.0.0`

This page contains a detailed list of breaking changes and the steps required to upgrade from `ts-api@1.x.x`
to `api-client@2.0.0`.

## Setup

`LocalazyApi` function was removed, use `ApiClient` class instead.

```javascript
// ts-api
import LocalazyApi from 'ts-api';

const api = LocalazyApi({ projectToken: 'your-project-token' });
```

```javascript
// api-client
import { ApiClient } from 'api-client';

const api: ApiClient = new ApiClient({ authToken: 'your-project-token' });
```

## Methods

### Projects

`listProjects` function was removed, use [`api.projects.list`](/docs/api-client-reference.md#projectslistrequest-config)
function instead.

```javascript
// ts-api
const options: ListProjects = {
  organization: true,
  languages: true
};
const projects: Project[] = await api.listProjects(options, config);

// api-client
const options: ProjectsListRequest = {
  organization: true,
  languages: true
};
const webhooks: Project[] = await api.projects.list(options, config);
```

### Import

`import` function was removed, use [`api.import.json`](/docs/api-client-reference.md#importjsonrequest-config)
function instead.

```javascript
// ts-api
const options: Import = {
  projectId: 'project-id',
  importAsNew: true,
  files: [
    {
      name: 'en.json',
      content: {
        type: 'json',
        en: { headers: { name: 'Name' } }
      }
    }
  ]
};
const result: ImportResult = await api.import(options, config);
const id: string = result.result;

// api-client
const options: ImportJsonRequest = {
  project: 'project-id',
  json: { en: { headers: { name: 'Name' } } },
  i18nOptions: {
    importAsNew: true
  },
  fileOptions: {
    name: 'en.json'
  }
};
const file: File = await api.import.json(options, config);
const id: string = file.importBatch;
```

### Formats

`listFormats` function was removed, use [`api.formats.list`](/docs/api-client-reference.md#formatslistconfig)
function instead.

```javascript
// ts-api
const formats: Format[] = await api.listFormats(config);

// api-client
const formats: Format[] = await api.formats.list(config);
```

### Files

`listFiles` function was removed, use [`api.files.list`](/docs/api-client-reference.md#fileslistrequest-config)
function instead.

```javascript
// ts-api
const options: ListFiles = {
  projectId: 'project-id'
};
const files: FileResult[] = await api.listFiles(options, config);

// api-client
const options: FilesListRequest = {
  project: 'project-id'
};
const files: File[] = await api.files.list(options, config);
```

`getFileContents` function was removed,
use [`api.files.getContents`](/docs/api-client-reference.md#filesgetcontentsrequest-config) function instead.

```javascript
// ts-api
const options: GetFileContents = {
  projectId: 'project-id',
  fileId: 'file-id',
  lang: 'en'
};
const blob: Blob = await api.getFileContents(options, config);

// api-client
const options: FileGetContentsRequest = {
  project: 'project-id',
  file: 'file-id',
  lang: 'en'
};
const blob: Blob = await api.files.getContents(options, config);
```

`listKeysInFileForLanguage` function was removed,
use [`api.files.listKeys`](/docs/api-client-reference.md#fileslistkeysrequest-config) function instead. New function no
longer returns paginated result, it returns all keys and pagination is done automatically.

### Keys

`updateKey` function was removed, use [`api.keys.update`](/docs/api-client-reference.md#keysupdaterequest-config)
function instead.

```javascript
// ts-api
const options: UpdateKey = {
  projectId: 'project-id',
  keyId: 'key-id',
  comment: 'comment'
};
await api.updateKey(options, config);

// api-client
const options: KeyUpdateRequest = {
  project: 'project-id',
  key: 'key-id',
  comment: 'comment'
};
await api.keys.update(options, config);
```

`deleteKey` function was removed, use [`api.keys.delete`](/docs/api-client-reference.md#keysdeleterequest-config)
function instead.

```javascript
// ts-api
const options: DeleteKey = {
  projectId: 'project-id',
  keyId: 'key-id'
};
await api.deleteKey(options, config);

// api-client
const options: KeyDeleteRequest = {
  project: 'project-id',
  key: 'key-id'
};
await api.keys.delete(options, config);
```

### Screenshots

`listScreenshots` function was removed,
use [`api.screenshots.list`](/docs/api-client-reference.md#screenshotslistrequest-config)
function instead.

```javascript
// ts-api
const options: ListScreenshots = {
  projectId: 'project-id'
};
const screenshots: Screenshot[] = await api.listScreenshots(options, config);

// api-client
const options: ScreenshotsListRequest = {
  project: 'project-id'
};
const screenshots: Screenshot[] = await api.screenshots.list(options, config);
```

`listScreenshotsTags` function was removed,
use [`api.screenshots.listTags`](/docs/api-client-reference.md#screenshotslisttagsrequest-config)
function instead.

```javascript
// ts-api
const options: ListScreenshotsTags = {
  projectId: 'project-id'
};
const tags: Tag[] = await api.listScreenshotsTags(options, config);

// api-client
const options: ScreenshotsListTagsRequest = {
  project: 'project-id'
};
const tags: ScreenshotTag[] = await api.screenshots.listTags(options, config);
```

`postScreenshots` function was removed,
use [`api.screenshots.create`](/docs/api-client-reference.md#screenshotscreaterequest-config)
function instead.

```javascript
// ts-api
const options: PostScreenshot = {
  projectId: 'project-id',
  rawScreenshot: 'data:image/png;base64...'
};
const result: PostScreenhotsResult = await api.postScreenshots(options, config);
const id: string = result.id;

// api-client
const options: ScreenshotCreateRequest = {
  project: 'project-id',
  encodedData: 'data:image/png;base64...'
};
const id: string = await api.screenshots.create(options, config);
```

`postScreenshot` function was removed,
use [`api.screenshots.updateImageData`](/docs/api-client-reference.md#screenshotsupdateimagedatarequest-config) function
instead.

```javascript
// ts-api
const options: PostScreenshot = {
  projectId: 'project-id',
  screenshotId: 'screenshot-id',
  rawScreenshot: 'data:image/png;base64...'
};
await api.postScreenshot(options, config);

// api-client
const options: ScreenshotUpdateImageDataRequest = {
  project: 'project-id',
  screenshot: 'screenshot-id',
  encodedData: 'data:image/png;base64...'
};
await api.screenshots.updateImageData(options, config);
```

`putScreenshot` function was removed,
use [`api.screenshots.update`](/docs/api-client-reference.md#screenshotsupdaterequest-config)
function instead.

```javascript
// ts-api
const options: PutScreenshot = {
  projectId: 'project-id',
  screenshotId: 'screenshot-id',
  screenshot: {
    comment: 'comment'
  }
};
await api.putScreenshot(options, config);

// api-client
const options: ScreenshotUpdateRequest = {
  project: 'project-id',
  screenshot: 'screenshot-id',
  comment: 'comment'
};
await api.screenshots.update(options, config);
```

`deleteScreenshot` function was removed,
use [`api.screenshots.delete`](/docs/api-client-reference.md#screenshotsdeleterequest-config)
function instead.

```javascript
// ts-api
const options: DeleteScreenshot = {
  projectId: 'project-id',
  screenshotId: 'screenshot-id'
};
await api.deleteScreenshot(options, config);

// api-client
const options: ScreenshotDeleteRequest = {
  project: 'project-id',
  screenshot: 'screenshot-id'
};
await api.screenshots.delete(options, config);
```

### Webhooks

`listWebhooks` function was removed, use [`api.webhooks.list`](/docs/api-client-reference.md#webhookslistrequest-config)
function instead.

```javascript
// ts-api
const options: ListWebhooks = {
  projectId: 'project-id'
};
const result: ListWebhooksResult = await api.listWebhooks(options, config);
const webhooks: Webhook[] = result.items;

// api-client
const options: WebhooksListRequest = {
  project: 'project-id'
};
const webhooks: Webhook[] = await api.webhooks.list(options, config);
```

`postWebhooks` function was removed,
use [`api.webhooks.update`](/docs/api-client-reference.md#webhooksupdaterequest-config)
function instead.

```javascript
// ts-api
const options: PostWebhooks = {
  projectId: 'project-id',
  webhooks: {
    items: []
  }
};
await api.postWebhooks(options, config);

// api-client
const options: WebhooksUpdateRequest = {
  project: 'project-id',
  items: []
};
await api.webhooks.update(options, config);
```

`getWebhooksSecret` function was removed,
use [`api.webhooks.getSecret`](/docs/api-client-reference.md#webhooksgetsecretrequest-config)
function instead.

```javascript
// ts-api
const options: GetWebhooksSecret = {
  projectId: 'project-id'
};
const result: GetWebhooksSecretResult = await api.getWebhooksSecret(options, config);
const secret: string = result.secret;

// api-client
const options: WebhooksGetSecretRequest = {
  project: 'project-id'
};
const secret: string = await api.webhooks.getSecret(options, config);
```
