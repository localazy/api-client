# API Client Reference

## Table of Contents

- [Setup](#setup)
- [Projects](#projects)
    - [projects.list](#projectslistrequest-config)
    - [projects.first](#projectsfirstrequest-config)
- [Files](#files)
    - [files.list](#fileslistrequest-config)
    - [files.first](#filesfirstrequest-config)
    - [files.listKeys](#fileslistkeysrequest-config)
    - [files.listKeysPage](#fileslistkeyspagerequest-config)
    - [files.getContents](#filesgetcontentsrequest-config)
- [Keys](#keys)
    - [keys.update](#keysupdaterequest-config)
    - [keys.delete](#keysdeleterequest-config)
- [Import](#import)
    - [import.json](#importjsonrequest-config)
- [Export](#export)
    - [export.json](#exportjsonrequest-config)
- [Formats](#formats)
    - [formats.list](#formatslistconfig)
- [Screenshots](#screenshots)
    - [screenshots.list](#screenshotslistrequest-config)
    - [screenshots.listTags](#screenshotslisttagsrequest-config)
    - [screenshots.create](#screenshotscreaterequest-config)
    - [screenshots.updateImageData](#screenshotsupdateimagedatarequest-config)
    - [screenshots.update](#screenshotsupdaterequest-config)
    - [screenshots.delete](#screenshotsdeleterequest-config)
- [Glossary](#glossary)
    - [glossary.list](#glossarylistrequest-config)
    - [glossary.find](#glossaryfindrequest-config)
    - [glossary.create](#glossarycreaterequest-config)
    - [glossary.update](#glossaryupdaterequest-config)
    - [glossary.delete](#glossarydeleterequest-config)
- [Webhooks](#webhooks)
    - [webhooks.list](#webhookslistrequest-config)
    - [webhooks.update](#webhooksupdaterequest-config)
    - [webhooks.getSecret](#webhooksgetSecretrequest-config)

## Setup

Create a new instance of ApiClient and pass in your project token.

| Arguments         | Type                                                            | Description           |
|-------------------|-----------------------------------------------------------------|:----------------------|
| options           | [`ApiClientOptions`](../src/types/api-client-options.ts)        | Api client options.   |
| config `optional` | [`CreateAxiosDefaults`](https://axios-http.com/docs/req_config) | Axios request config. |

| Returns     | Type                                   |
|-------------|:---------------------------------------|
| `ApiClient` | [`ApiClient`](../src/types/project.ts) |

```javascript
import { ApiClient } from '@localazy/api-client';

const api = new ApiClient({ authToken: 'project-token' });
```

## Projects

### projects.list(request[, config])

List all [projects](../src/types/project.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/projects#list-projects)

| Arguments         | Type                                                           | Description                   |
|-------------------|----------------------------------------------------------------|:------------------------------|
| request           | [`ProjectsListRequest`](../src/types/projects-list-request.ts) | Projects list request config. |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) | Axios request config.         |

| Returns              | Type                                 |
|----------------------|:-------------------------------------|
| `Promise<Project[]>` | [`Project`](../src/types/project.ts) |

```javascript
const projects = await api.projects.list({
  organization: true,
  languages: true
});
```

### projects.first(request[, config])

First [project](../src/types/project.ts).

> At least one project must exist, otherwise an error is thrown.

See: [Localazy API Docs](https://localazy.com/docs/api/projects#list-projects)

| Arguments         | Type                                                           | Description                   |
|-------------------|----------------------------------------------------------------|:------------------------------|
| request           | [`ProjectsListRequest`](../src/types/projects-list-request.ts) | Projects list request config. |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) | Axios request config.         |

| Returns            | Type                                 |
|--------------------|:-------------------------------------|
| `Promise<Project>` | [`Project`](../src/types/project.ts) |

```javascript
const project = await api.projects.first({
  organization: true,
  languages: true
});
```

## Files

### files.list(request[, config])

List all [files](../src/types/file.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-files-in-project)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`FilesListRequest`](../src/types/files-list-request.ts)       |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns           | Type                           |
|-------------------|:-------------------------------|
| `Promise<File[]>` | [`File`](../src/types/file.ts) |

```javascript
const files = await api.files.list({
  project: 'project-id' // or Project object
});
```

### files.first(request[, config])

First [file](../src/types/file.ts) in the project.

> At least one file must exist, otherwise an error is thrown.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-files-in-project)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`FilesListRequest`](../src/types/files-list-request.ts)       |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns         | Type                           |
|-----------------|:-------------------------------|
| `Promise<File>` | [`File`](../src/types/file.ts) |

```javascript
const file = await api.files.first({
  project: 'project-id' // or Project object
});
```

### files.listKeys(request[, config])

List all [keys](../src/types/key.ts) for the language in the [file](../src/types/file.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file)

| Arguments         | Type                                                            |
|-------------------|-----------------------------------------------------------------|
| request           | [`FileListKeysRequest`](../src/types/file-list-keys-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)  |

| Returns          | Type                         |
|------------------|:-----------------------------|
| `Promise<Key[]>` | [`Key`](../src/types/key.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = await api.files.listKeys({
  project: 'project-id', // or Project object
  file: 'file-id',       // or File object
  lang: Locales.ENGLISH
});
```

### files.listKeysPage(request[, config])

List all [keys](../src/types/key.ts) for the language in the [file](../src/types/file.ts). Result is paginated.

See: [Localazy API Docs](https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file)

| Arguments         | Type                                                            |
|-------------------|-----------------------------------------------------------------|
| request           | [`FileListKeysRequest`](../src/types/file-list-keys-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)  |

| Returns                  | Type                                              |
|--------------------------|:--------------------------------------------------|
| `Promise<PaginatedKeys>` | [`PaginatedKeys`](../src/types/keys-paginated.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = [];
let pageResult = { keys: [], next: '' };

do {
  pageResult = await api.files.listKeysPage({
    project: 'project-id', // or Project object
    file: 'file-id',       // or File object
    lang: Locales.ENGLISH,
    next: pageResult.next
  });
  keys.push(...pageResult.keys);
} while (pageResult.next);
```

### files.getContents(request[, config])

Get the contents of the [file](../src/types/file.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-file-content)

| Arguments         | Type                                                                 |
|-------------------|----------------------------------------------------------------------|
| request           | [`FileGetContentRequest`](../src/types/file-get-contents-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)       |

| Returns         | Type                                                            |
|-----------------|:----------------------------------------------------------------|
| `Promise<Blob>` | [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) |

```javascript
import { Locales } from '@localazy/api-client';

const blob = await api.files.getContents({
  project: 'project-id', // or Project object
  file: 'file-id',       // or File object
  lang: Locales.ENGLISH
});
```

## Keys

### keys.update(request[, config])

Update [key](../src/types/key.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#update-source-key)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`KeyUpdateRequest`](../src/types/key-update-request.ts)       |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.keys.update({
  project: 'project-id', // or Project object
  key: 'key-id',         // or Key object
  deprecated: -1,
  hidden: false,
  comment: 'Comment.',
  limit: -1
});
```

### keys.delete(request[, config])

Delete [key](../src/types/key.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#delete-source-key)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`KeyDeleteRequest`](../src/types/key-delete-request.ts)       |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.keys.delete({
  project: 'project-id', // or Project object
  key: 'key-id',         // or Key object
});
```

## Import

### import.json(request[, config])

Import JSON object as source keys.

See: [Localazy API Docs](https://localazy.com/docs/api/import#import-content-to-a-project)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`ImportJsonRequest`](../src/types/import-json-request.ts)     |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns         | Type                           |
|-----------------|:-------------------------------|
| `Promise<File>` | [`File`](../src/types/file.ts) |

```javascript
import { I18nDeprecate } from '@localazy/api-client';

const json = { en: { headers: { name: 'Name' } } };

const file = await api.import.json({
  project: 'project-id', // or Project object
  json,
  i18nOptions: {
    importAsNew: false,
    forceCurrent: false,
    forceSource: false,
    filterSource: true,
    deprecate: I18nDeprecate.NONE
  },
  fileOptions: {
    name: 'translations.json',
    path: 'path/to/dir',
    module: 'i18n',
    buildType: '',
    productFlavors: []
  }
});
```

## Export

### export.json(request[, config])

Export translated keys as JSON object.

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`ExportJsonRequest`](../src/types/export-json-request.ts)     |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns             | Type                                    |
|---------------------|:----------------------------------------|
| `Promise<I18nJson>` | [`I18nJson`](../src/types/i18n-json.ts) |

```javascript
import { Locales } from '@localazy/api-client'

const json = await api.export.json({
  project: 'project-id', // or Project object
  file: 'file-id',       // or File object
  langs: [Locales.ENGLISH],
  nestedKeys: true
});
```

## Formats

### formats.list([config])

List all [formats](../src/types/format.ts) and related options.

See: [Localazy API Docs](https://localazy.com/docs/api/import#list-available-file-types)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns             | Type                               |
|---------------------|:-----------------------------------|
| `Promise<Format[]>` | [`Format`](../src/types/format.ts) |

```javascript
const formats = await api.formats.list();
```

## Screenshots

### screenshots.list(request[, config])

List all [screenshots](../src/types/screenshot.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#list-screenshots)

| Arguments         | Type                                                                 |
|-------------------|----------------------------------------------------------------------|
| request           | [`ScreenshotsListRequest`](../src/types/screenshots-list-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)       |

| Returns                 | Type                                       |
|-------------------------|:-------------------------------------------|
| `Promise<Screenshot[]>` | [`Screenshot`](../src/types/screenshot.ts) |

```javascript
const screenshots = await api.screenshots.list({
  project: 'project-id', // or Project object
});
```

### screenshots.listTags(request[, config])

List all [screenshots tags](../src/types/screenshot-tag.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#list-screenshots-tags)

| Arguments         | Type                                                                          |
|-------------------|-------------------------------------------------------------------------------|
| request           | [`ScreenshotsListTagsRequest`](../src/types/screenshots-list-tags-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)                |

| Returns                    | Type                                              |
|----------------------------|:--------------------------------------------------|
| `Promise<ScreenshotTag[]>` | [`ScreenshotTag`](../src/types/screenshot-tag.ts) |

```javascript
const tags = await api.screenshots.listTags({
  project: 'project-id', // or Project object
});
```

### screenshots.create(request[, config])

Create [screenshot](../src/types/screenshot.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#create-a-new-screenshot)

| Arguments         | Type                                                                   |
|-------------------|------------------------------------------------------------------------|
| request           | [`ScreenshotCreateRequest`](../src/types/screenshot-create-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)         |

| Returns           | Type           |
|-------------------|:---------------|
| `Promise<string>` | Screenshot id. |

```javascript
const id = await api.screenshots.create({
  project: 'project-id', // or Project object
  encodedData: 'data:image/jpg;base64,...'
});
```

### screenshots.updateImageData(request[, config])

Update the image data of [screenshot](../src/types/screenshot.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#update-the-image-of-an-existing-screenshot)

| Arguments         | Type                                                                                       |
|-------------------|--------------------------------------------------------------------------------------------|
| request           | [`ScreenshotUpdateImageDataRequest`](../src/types/screenshot-update-image-data-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)                             |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.screenshots.updateImageData({
  project: 'project-id', // or Project object
  encodedData: 'data:image/jpg;base64,...'
});
```

### screenshots.update(request[, config])

Update [screenshot](../src/types/screenshot.ts).
Image data are updated with `screenshots.updateImageData`.

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#update-an-existing-screenshot)

| Arguments         | Type                                                                   |
|-------------------|------------------------------------------------------------------------|
| request           | [`ScreenshotUpdateRequest`](../src/types/screenshot-update-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)         |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.screenshots.update({
  project: 'project-id',       // or Project object
  screenshot: 'screenshot-id', // or Screenshot object
  comment: 'Customers list.',
  tags: ['customers'],
});
```

### screenshots.delete(request[, config])

Delete [screenshot](../src/types/screenshot.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#delete-a-screenshot)

| Arguments         | Type                                                                   |
|-------------------|------------------------------------------------------------------------|
| request           | [`ScreenshotDeleteRequest`](../src/types/screenshot-delete-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)         |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.screenshots.delete({
  project: 'project-id',       // or Project object
  screenshot: 'screenshot-id', // or Screenshot object
});
```

## Glossary

### glossary.list(request[, config])

List all [glossary records](../src/types/glossary-record.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#list-all-glossary-terms)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`GlossaryListRequest`](../src/types/glossary-list-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns                     | Type                                                |
|-----------------------------|:----------------------------------------------------|
| `Promise<GlossaryRecord[]>` | [`GlossaryRecord`](../src/types/glossary-record.ts) |

```javascript
const glossaryRecords = await api.glossary.list({
  project: 'project-id' // or Project object
});
```

### glossary.find(request[, config])

Find [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#get-glossary-term)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`GlossaryFindRequest`](../src/types/glossary-find-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns                   | Type                                                |
|---------------------------|:----------------------------------------------------|
| `Promise<GlossaryRecord>` | [`GlossaryRecord`](../src/types/glossary-record.ts) |

```javascript
const glossaryRecord = await api.glossary.find({
  project: 'project-id',               // or Project object
  glossaryRecord: 'glossary-record-id' // or GlossaryRecord object
});
```

### glossary.create(request[, config])

Create [glossary record](../src/types/glossary-record.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#create-new-glossary-term)

| Arguments         | Type                                                               |
|-------------------|--------------------------------------------------------------------|
| request           | [`GlossaryCreateRequest`](../src/types/glossary-create-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)     |

| Returns           | Type               |
|-------------------|:-------------------|
| `Promise<string>` | GlossaryRecord id. |

```javascript
import { Locales } from '@localazy/api-client';

const id = await api.glossary.create({
  project: 'project-id', // or Project object
  description: 'Term description',
  caseSensitive: true,
  translateTerm: true,
  term: [
    { lang: Locales.ENGLISH, term: 'befitting' },
  ],
});
```

### glossary.update(request[, config])

Update [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#update-glossary-term)

| Arguments         | Type                                                               |
|-------------------|--------------------------------------------------------------------|
| request           | [`GlossaryUpdateRequest`](../src/types/glossary-update-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)     |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
import { Locales } from '@localazy/api-client';

await api.glossary.update({
  project: 'project-id',                // or Project object
  glossaryRecord: 'glossary-record-id', // or GlossaryRecord object
  description: 'Term description',
  caseSensitive: true,
  translateTerm: true,
  term: [
    { lang: Locales.ENGLISH, term: 'befitting' },
  ],
});
```

### glossary.delete(request[, config])

Delete [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#delete-glossary-term)

| Arguments         | Type                                                               |
|-------------------|--------------------------------------------------------------------|
| request           | [`GlossaryDeleteRequest`](../src/types/glossary-delete-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)     |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.glossary.delete({
  project: 'project-id',               // or Project object
  glossaryRecord: 'glossary-record-id' // or GlossaryRecord object
});
```

## Webhooks

### webhooks.list(request[, config])

List all [webhooks](../src/types/webhook.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#list-webhooks-configuration)

| Arguments         | Type                                                           |
|-------------------|----------------------------------------------------------------|
| request           | [`WebhooksListRequest`](../src/types/webhooks-list-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) |

| Returns              | Type                                 |
|----------------------|:-------------------------------------|
| `Promise<Webhook[]>` | [`Webhook`](../src/types/webhook.ts) |

```javascript
const webhooks = await api.webhooks.list({
  project: 'project-id' // or Project object
});
```

### webhooks.update(request[, config])

Update all [webhooks](../src/types/webhook.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#update-webhooks-configuration)

| Arguments         | Type                                                               |
|-------------------|--------------------------------------------------------------------|
| request           | [`WebhooksUpdateRequest`](../src/types/webhooks-update-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)     |

| Returns         |
|-----------------|
| `Promise<void>` |

```javascript
await api.webhooks.update({
  project: 'project-id', // or Project object
  data: [
    {
      enabled: true,
      customId: '1',
      description: 'This is a test webhook',
      url: 'https://example.com/webhook',
      events: [
        'comment_added',
        'import_finished',
        'import_finished_empty',
        'project_published',
        'tag_promoted',
      ],
    },
  ]
});
```

### webhooks.getSecret(request[, config])

Get secret for [webhooks](../src/types/webhook.ts) in the project.
Localazy signs the webhook events it sends to your endpoints and adds a signature in the request
header https://localazy.com/docs/api/webhooks-api#security.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#webhook-secrets)

| Arguments         | Type                                                                      |
|-------------------|---------------------------------------------------------------------------|
| request           | [`WebhooksGetSecretRequest`](../src/types/webhooks-get-secret-request.ts) |
| config `optional` | [`AxiosRequestConfig`](https://axios-http.com/docs/req_config)            |

| Returns                   | Type                                                |
|---------------------------|:----------------------------------------------------|
| `Promise<WebhooksSecret>` | [`WebhooksSecret`](../src/types/webhooks-secret.ts) |

```javascript
const secret = await api.webhooks.getSecret({
  project: 'project-id', // or Project object
});
```

