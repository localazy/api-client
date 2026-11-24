# API Client Reference

## Table of Contents

- [Setup](#setup)
- [AI Translation](#ai-translation)
  - [ai.translate](#aitranslaterequest-config)
- [Projects](#projects)
  - [projects.list](#projectslistrequest-config)
  - [projects.first](#projectsfirstrequest-config)
  - [projects.create](#projectscreaterequest-config)
- [Organizations](#organizations)
  - [organizations.getUsage](#organizationsgetusagerequest-config)
  - [organizations.search](#organizationssearchrequest-config)
  - [organizations.getCreditSummary](#organizationsgetcreditsummaryrequest-config)
  - [organizations.listCreditTransactions](#organizationslistcredittransactionsrequest-config)
  - [organizations.listCreditTransactionsPage](#organizationslistcredittransactionspagerequest-config)
  - [organizations.listCreditTopups](#organizationslistcredittopupsrequest-config)
- [Files](#files)
  - [files.list](#fileslistrequest-config)
  - [files.first](#filesfirstrequest-config)
  - [files.listKeys](#fileslistkeysrequest-config)
  - [files.listKeysPage](#fileslistkeyspagerequest-config)
  - [files.getContents](#filesgetcontentsrequest-config)
  - [files.listPublished](#fileslistpublishedrequest-config)
- [Keys](#keys)
  - [keys.update](#keysupdaterequest-config)
  - [keys.delete](#keysdeleterequest-config)
  - [keys.deprecate](#keysdeprecaterequest-config)
  - [keys.submitTranslation](#keyssubmittranslationrequest-config)
  - [keys.getDetails](#keysgetdetailsrequest-config)
  - [keys.editSource](#keyseditsourcerequest-config)
  - [keys.reviewTranslation](#keysreviewtranslationrequest-config)
  - [keys.setTags](#keyssettagsrequest-config)
  - [keys.setMetadata](#keyssetmetadatarequest-config)
  - [keys.rename](#keysrenamerequest-config)
  - [keys.setPriority](#keyssetpriorityrequest-config)
- [Comments](#comments)
  - [comments.list](#commentslistrequest-config)
  - [comments.create](#commentscreaterequest-config)
  - [comments.update](#commentsupdaterequest-config)
  - [comments.delete](#commentsdeleterequest-config)
  - [glossary.createMany](#glossarycreatemanyrequest-config)
- [Suggestions](#suggestions)
  - [suggestions.tm](#suggestionstmrequest-config)
  - [suggestions.mt](#suggestionsmtrequest-config)
  - [suggestions.ai](#suggestionsairequest-config)
- [Plural keys](#plural-keys)
  - [plural()](#pluralforms)
- [Import](#import)
  - [import.json](#importjsonrequest-config)
- [Export](#export)
  - [export.json](#exportjsonrequest-config)
- [Formats](#formats)
  - [formats.list](#formatslistconfig)
- [Languages](#languages)
  - [languages.add](#languagesaddrequest-config)
  - [languages.hide](#languageshiderequest-config)
  - [languages.enable](#languagesenablerequest-config)
  - [languages.disable](#languagesdisablerequest-config)
  - [languages.delete](#languagesdeleterequest-config)
  - [languages.copy](#languagescopyrequest-config)
  - [languages.replace](#languagesreplacerequest-config)
  - [languages.setFallback](#languagessetfallbackrequest-config)
  - [languages.listKeys](#languageslistkeysrequest-config)
  - [languages.listKeysPage](#languageslistkeyspagerequest-config)
  - [languages.listPlurals](#languageslistpluralsrequest-config)
- [Styleguides](#styleguides)
  - [styleguides.list](#styleguideslistrequest-config)
- [CDN](#cdn)
  - [cdn.list](#cdnlistrequest-config)
- [Branches](#branches)
  - [branches.list](#brancheslistrequest-config)
  - [branches.create](#branchescreaterequest-config)
  - [branches.rename](#branchesrenamerequest-config)
  - [branches.delete](#branchesdeleterequest-config)
  - [branches.setMain](#branchessetmainrequest-config)
  - [branches.separate](#branchesseparaterequest-config)
  - [branches.analyzeMerge](#branchesanalyzemergerequest-config)
  - [branches.merge](#branchesmergerequest-config)
  - [branches.getOperation](#branchesgetoperationrequest-config)
- [Links](#links)
  - [links.list](#linkslistrequest-config)
  - [links.listPage](#linkslistpagerequest-config)
  - [links.create](#linkscreaterequest-config)
  - [links.delete](#linksdeleterequest-config)
- [Segmentation](#segmentation)
  - [segmentation.getParent](#segmentationgetparentrequest-config)
- [Tags](#tags)
  - [tags.list](#tagslistrequest-config)
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
  - [webhooks.getSecret](#webhooksgetsecretrequest-config)

## Setup

Create a new instance of ApiClient and pass in your project token.

| Arguments | Type                                                     | Description         |
| --------- | -------------------------------------------------------- | :------------------ |
| options   | [`ApiClientOptions`](../src/types/api-client-options.ts) | Api client options. |

| Returns     | Type                                   |
| ----------- | :------------------------------------- |
| `ApiClient` | [`ApiClient`](../src/types/project.ts) |

```javascript
import { ApiClient } from '@localazy/api-client';

const api = new ApiClient({ authToken: 'project-token' });
```

## AI Translation

### ai.translate(request[, config])

Translate provided items from the source language to the target language using Localazy AI and considering the provided context, project-defined style guide and glossary. Each translation request consumes Localazy credits from your account.

> This endpoint is only available with the Owner's token or a Translation Token.

See: [Localazy API Docs](https://localazy.com/docs/api/ai-translation-api#translate)

| Arguments         | Type                                                         |
| ----------------- | ------------------------------------------------------------ |
| request           | [`AiTranslateRequest`](../src/types/ai-translate-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)            |

| Returns                        | Type                                                           |
| ------------------------------ | :------------------------------------------------------------- |
| `Promise<AiTranslateResponse>` | [`AiTranslateResponse`](../src/types/ai-translate-response.ts) |

Simple strings:

```javascript
const response = await api.ai.translate({
  project: 'project-id', // or Project object
  from: 'en',
  to: 'cs',
  items: [
    {
      key: 'btn_submit',
      source: 'Submit',
      comment: 'Button label for form submission',
    },
    {
      key: 'welcome_message',
      source: 'Welcome back, %s!',
      lengthLimit: 50,
    },
  ],
});
```

Plural forms:

```javascript
const response = await api.ai.translate({
  project: 'project-id', // or Project object
  from: 'en',
  to: 'cs',
  items: [
    {
      key: 'item_count',
      source: {
        one: '%d item',
        other: '%d items',
      },
    },
  ],
});
```

With fallback engine:

```javascript
const response = await api.ai.translate({
  project: 'project-id', // or Project object
  from: 'en',
  to: 'de',
  fallback: 'deepl',
  items: [
    {
      source: 'Hello, world!',
    },
  ],
});
```

## Projects

### projects.list(request[, config])

List all [projects](../src/types/project.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/projects#list-projects)

| Arguments         | Type                                                           | Description                   |
| ----------------- | -------------------------------------------------------------- | :---------------------------- |
| request           | [`ProjectsListRequest`](../src/types/projects-list-request.ts) | Projects list request config. |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              | Request config.               |

| Returns              | Type                                 |
| -------------------- | :----------------------------------- |
| `Promise<Project[]>` | [`Project`](../src/types/project.ts) |

```javascript
const projects = await api.projects.list({
  organization: true,
  languages: true,
});
```

### projects.first(request[, config])

First [project](../src/types/project.ts).

> At least one project must exist, otherwise an error is thrown.

See: [Localazy API Docs](https://localazy.com/docs/api/projects#list-projects)

| Arguments         | Type                                                           | Description                   |
| ----------------- | -------------------------------------------------------------- | :---------------------------- |
| request           | [`ProjectsListRequest`](../src/types/projects-list-request.ts) | Projects list request config. |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              | Request config.               |

| Returns            | Type                                 |
| ------------------ | :----------------------------------- |
| `Promise<Project>` | [`Project`](../src/types/project.ts) |

```javascript
const project = await api.projects.first({
  organization: true,
  languages: true,
});
```

### projects.create(request[, config])

Create a [project](../src/types/project.ts) in the organization of the token. Needs an organization
token.

Rejected when the organization already has 50 projects, the name is blank or longer than 64
characters, the description is longer than 1000 characters, the source language is unknown, or the
slug is invalid or already taken. Without `slug`, one is generated from the name.

See: [Localazy API Docs](https://localazy.com/docs/api/projects#create-project)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`ProjectCreateRequest`](../src/types/project-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<ProjectCreateResponse>`](../src/types/project-create-response.ts) |

```javascript
const { projectId } = await api.projects.create({
  name: 'My Application',
  sourceLanguage: 'en', // default 'en'
  type: 'public', // default 'restricted'
  tone: 'informal', // default 'not_specified'
});
```

## Organizations

The organization endpoints need an organization token. `organization` is the organization's ID or
slug; a project's organization ID is `Project.orgId`.

Quota and credits belong to the billing (top-level) organization. When `organization` is a team, the
usage and credit methods return the parent's data, and `organizationId` in the response names it.

Credit amounts are decimal strings, not numbers; parse them with a decimal type to keep the
precision. The credit methods take a period: `from` is inclusive, `to` exclusive, each an ISO 8601
date (`2026-11-01`, midnight UTC), date-time, or `Date`. `from` defaults to `to` minus 30 days, and
`to` defaults to (and is capped at) now minus 60 seconds. A period may be at most 366 days long. The
response gives the period the server used: for an incremental sync, pass its `to` as the next `from`.

### organizations.getUsage(request[, config])

Get the source key quota usage and the credit balance of an organization. `keys.remaining` is not
clamped: it goes negative when the organization is over its quota.

See: [Localazy API Docs](https://localazy.com/docs/api/organization-usage#get-usage)

| Arguments         | Type                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| request           | [`OrganizationUsageRequest`](../src/types/organization-usage-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                        |

| Returns                                                            |
| ------------------------------------------------------------------ |
| [`Promise<OrganizationUsage>`](../src/types/organization-usage.ts) |

```javascript
const { keys, credits } = await api.organizations.getUsage({
  organization: 'organization-id', // or slug
});
```

### organizations.search(request[, config])

Full-text search in the keys, comments and translations of all projects of an organization. One key
can give several results: one for its name, one for its comment and one per matching language.

Needs organization search in the plan, and a top-level organization; otherwise the call fails with
`search_not_available`. Returns at most 2000 results with no paging; narrow the search with a longer
`term` or the filters. Projects the token's user can't read give no results and no error. Changes
show in the results up to about an hour after the project is published.

See: [Localazy API Docs](https://localazy.com/docs/api/organization-search#search)

| Arguments         | Type                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| request           | [`OrganizationSearchRequest`](../src/types/organization-search-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                          |

| Returns                                                                               |
| ------------------------------------------------------------------------------------- |
| [`Promise<OrganizationSearchResponse>`](../src/types/organization-search-response.ts) |

```javascript
const { results, projects } = await api.organizations.search({
  organization: 'organization-id',
  term: 'cart',
  projects: ['project-id'], // or Project objects; optional
  match: ['key', 'translation'], // optional, all kinds by default
  langs: ['de', 'cs'], // optional, filters translation matches only
});
```

### organizations.getCreditSummary(request[, config])

Get the credit consumption of an organization in a period, the credits topped up in it and the
current balance, optionally grouped. `spent` excludes `system` costs (trial credit reclaim, negative
balance cover), which are reported as `adjusted`; the balance change in the period is
`toppedUp - spent - adjusted`.

`groupBy` defaults to `['day']`; an empty list gives the totals only. Use `day` or `month`, not
both. Groups have no paging.

See: [Localazy API Docs](https://localazy.com/docs/api/organization-credits#get-credit-summary)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`CreditSummaryRequest`](../src/types/credit-summary-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<CreditSummaryResponse>`](../src/types/credit-summary-response.ts) |

```javascript
const { spent, groups } = await api.organizations.getCreditSummary({
  organization: 'organization-id',
  from: '2026-11-01',
  to: '2026-12-01',
  groupBy: ['day', 'category'],
});
```

### organizations.listCreditTransactions(request[, config])

List all credit costs of an organization in a period, one row per charge, in time order. Every
machine or AI translation of a key into one language is one row, so a long period can hold a very
large number of rows; this method fetches every page.

See: [Localazy API Docs](https://localazy.com/docs/api/organization-credits#list-credit-transactions)

| Arguments         | Type                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- |
| request           | [`CreditTransactionsListRequest`](../src/types/credit-transactions-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                                   |

| Returns                                                              |
| -------------------------------------------------------------------- |
| [`Promise<CreditTransactions>`](../src/types/credit-transactions.ts) |

```javascript
const { to, transactions } = await api.organizations.listCreditTransactions({
  organization: 'organization-id',
  from: lastSync, // the `to` of the previous sync
});
```

### organizations.listCreditTransactionsPage(request[, config])

List credit costs of an organization in a period. Result is paginated: `limit` sets the page size (1
to 10000, default 1000). Request the next page with `next` and the same `to` as the first page; when
`to` was omitted, pass the `to` of the first response, since the default moves with the clock.

See: [Localazy API Docs](https://localazy.com/docs/api/organization-credits#list-credit-transactions)

| Arguments         | Type                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- |
| request           | [`CreditTransactionsListRequest`](../src/types/credit-transactions-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                                   |

| Returns                                                                                 |
| --------------------------------------------------------------------------------------- |
| [`Promise<CreditTransactionsPaginated>`](../src/types/credit-transactions-paginated.ts) |

```javascript
const first = await api.organizations.listCreditTransactionsPage({
  organization: 'organization-id',
  from: '2026-11-01',
});
const transactions = [...first.transactions];
let page = first;

while (page.next) {
  page = await api.organizations.listCreditTransactionsPage({
    organization: 'organization-id',
    to: first.to,
    next: page.next,
  });
  transactions.push(...page.transactions);
}
```

### organizations.listCreditTopups(request[, config])

List the credits added to an organization in a period, in time order, with no paging. `type` is
`plan` (refill of the plan allowance; `amount` is what the refill added and can be 0 or negative),
`extra` (purchase, bonus) or `balance_cover` (cover of a negative balance, booked together with an
equal `adjusted` cost).

See: [Localazy API Docs](https://localazy.com/docs/api/organization-credits#list-credit-topups)

| Arguments         | Type                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| request           | [`CreditTopupsListRequest`](../src/types/credit-topups-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                       |

| Returns                                                                   |
| ------------------------------------------------------------------------- |
| [`Promise<CreditTopupsResponse>`](../src/types/credit-topups-response.ts) |

```javascript
const { topups } = await api.organizations.listCreditTopups({
  organization: 'organization-id',
  from: '2026-10-01',
});
```

## Files

### files.list(request[, config])

List all [files](../src/types/file.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-files-in-project)

| Arguments         | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| request           | [`FilesListRequest`](../src/types/files-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)        |

| Returns           | Type                           |
| ----------------- | :----------------------------- |
| `Promise<File[]>` | [`File`](../src/types/file.ts) |

```javascript
const files = await api.files.list({
  project: 'project-id', // or Project object
});
```

### files.first(request[, config])

First [file](../src/types/file.ts) in the project.

> At least one file must exist, otherwise an error is thrown.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-files-in-project)

| Arguments         | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| request           | [`FilesListRequest`](../src/types/files-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)        |

| Returns         | Type                           |
| --------------- | :----------------------------- |
| `Promise<File>` | [`File`](../src/types/file.ts) |

```javascript
const file = await api.files.first({
  project: 'project-id', // or Project object
});
```

### files.listKeys(request[, config])

List all [keys](../src/types/key.ts) for the language in the [file](../src/types/file.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file)

| Arguments         | Type                                                            |
| ----------------- | --------------------------------------------------------------- |
| request           | [`FileListKeysRequest`](../src/types/file-list-keys-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)               |

| Returns          | Type                         |
| ---------------- | :--------------------------- |
| `Promise<Key[]>` | [`Key`](../src/types/key.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = await api.files.listKeys({
  project: 'project-id', // or Project object
  file: 'file-id', // or File object
  lang: Locales.ENGLISH,
});
```

### files.listKeysPage(request[, config])

List all [keys](../src/types/key.ts) for the language in the [file](../src/types/file.ts). Result is paginated.

See: [Localazy API Docs](https://localazy.com/docs/api/files#retrieve-a-list-of-keys-and-translations-from-file)

| Arguments         | Type                                                            |
| ----------------- | --------------------------------------------------------------- |
| request           | [`FileListKeysRequest`](../src/types/file-list-keys-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)               |

| Returns                  | Type                                              |
| ------------------------ | :------------------------------------------------ |
| `Promise<PaginatedKeys>` | [`PaginatedKeys`](../src/types/keys-paginated.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = [];
let pageResult = { keys: [], next: '' };

do {
  pageResult = await api.files.listKeysPage({
    project: 'project-id', // or Project object
    file: 'file-id', // or File object
    lang: Locales.ENGLISH,
    next: pageResult.next,
  });
  keys.push(...pageResult.keys);
} while (pageResult.next);
```

### files.getContents(request[, config])

Get the contents of the [file](../src/types/file.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-file-content)

| Arguments         | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| request           | [`FileGetContentRequest`](../src/types/file-get-contents-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                    |

| Returns         | Type                                                            |
| --------------- | :-------------------------------------------------------------- |
| `Promise<Blob>` | [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) |

```javascript
import { Locales } from '@localazy/api-client';

const blob = await api.files.getContents({
  project: 'project-id', // or Project object
  file: 'file-id', // or File object
  lang: Locales.ENGLISH,
});
```

### files.listPublished(request[, config])

List when the project's current content (`latest`, always first, tag ID `_e0`) and each release tag
were last published; `publishedAt` is `null` for a tag never published. Use it to check cheaply for new
content: keep `publishedAt` and download only when it changed. It changes on every publish, even when
the files didn't, and a publish can come up to 5 minutes after a change.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-publish-times)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`PublishedListRequest`](../src/types/published-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns                      | Type                                                  |
| ---------------------------- | :---------------------------------------------------- |
| `Promise<PublishedRecord[]>` | [`PublishedRecord`](../src/types/published-record.ts) |

```javascript
const [latest] = await api.files.listPublished({
  project: 'project-id', // or Project object
});

if (latest.publishedAt !== previousPublishedAt) {
  // download the files
}
```

## Keys

### keys.update(request[, config])

Update [key](../src/types/key.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#update-source-key)

| Arguments         | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| request           | [`KeyUpdateRequest`](../src/types/key-update-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)        |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.keys.update({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  deprecated: -1,
  hidden: false,
  comment: 'Comment.',
  limit: -1,
  addMetadata: { 'figma:doc': { node: '1:2' } }, // merged into the key's metadata
  removeMetadata: ['figma:old'],
});
```

### keys.delete(request[, config])

Delete [key](../src/types/key.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#delete-source-key)

| Arguments         | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| request           | [`KeyDeleteRequest`](../src/types/key-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)        |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.keys.delete({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
});
```

### keys.deprecate(request[, config])

Deprecate [keys](../src/types/key.ts).

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`KeyDeprecateRequest`](../src/types/key-deprecate-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.keys.deprecate({
  project: 'project-id', // or Project object
  phrases: ['key-id'], // or Key objects
});
```

### keys.submitTranslation(request[, config])

Submit a translation for a single [key](../src/types/key.ts) in one target language.

`value` must match the key's form: a string for a singular key, an array of strings for an array
key, or an object keyed by CLDR plural class for a plural key. `lang` accepts a locale code or
Localazy's numeric language id, and is URL-escaped, so script-qualified locales such as `zh#Hans`
are transmitted intact.

Plural values may use either the plain classes the write API expects (`{ one: '1 item' }`) or the
`@`-prefixed form the read API returns (`{ '@one': '1 item' }`) — the prefix is stripped for you, so
a value taken straight from `files.listKeys()` round-trips correctly.

**Check `result` on the response.** The API answers HTTP 200 with `result: false` and a `message`
when a submission is deliberately not applied — the target is the project's source language, the
project is momentarily locked by a running import, or the translation could not be stored. None of
those reject the promise.

| Arguments         | Type                                                                            |
| ----------------- | ------------------------------------------------------------------------------- |
| request           | [`KeySubmitTranslationRequest`](../src/types/key-submit-translation-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                               |

| Returns                                                                             |
| ----------------------------------------------------------------------------------- |
| [`Promise<SubmitTranslationResponse>`](../src/types/submit-translation-response.ts) |

```javascript
// singular key
await api.keys.submitTranslation({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  lang: 'cs',
  value: 'Uložit změny',
});

// plural key
await api.keys.submitTranslation({
  project: 'project-id',
  key: 'key-id',
  lang: 'cs',
  value: { one: '1 položka', few: '%d položky', other: '%d položek' },
});
```

### keys.getDetails(request[, config])

Get everything Localazy knows about [keys](../src/types/key.ts) in one language: file, tags,
priority, developer comment and context note, source text, current translation with its state, the
version waiting for review, and the comments in that language.

Pass 1 to 100 keys per call; a larger set is rejected rather than truncated. Keys the project lacks
(`not_found`) or that are segmented as a whole (`segmented_key`) are reported in `errors` and do not
fail the request. Use `translation.review.versionId` to address a version.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#get-key-details)

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`KeyDetailsRequest`](../src/types/key-details-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns                                                               |
| --------------------------------------------------------------------- |
| [`Promise<KeyDetailsResponse>`](../src/types/key-details-response.ts) |

```javascript
const { keys, errors } = await api.keys.getDetails({
  project: 'project-id', // or Project object
  keys: ['key-id-1', 'key-id-2'], // or Key objects
  lang: 'cs',
});
```

### keys.editSource(request[, config])

Write a new source text for a [key](../src/types/key.ts). `value` follows the same rules as in
`keys.submitTranslation()`, including the `@`-prefixed plural form.

The text becomes current immediately only for callers allowed to auto-approve their own versions
(manager, owner); for others it waits for a review. When it becomes current and differs, the key's
translations get the `sourceChanged` state; pass `sourceChanged: false` for a change such as a typo
fix. Segmented keys and their segments are rejected.

**Check `result` on the response.** `false` with a `message` means the project was momentarily
locked or the value was not stored; it does not reject the promise.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#edit-source-text)

| Arguments         | Type                                                              |
| ----------------- | ----------------------------------------------------------------- |
| request           | [`KeyEditSourceRequest`](../src/types/key-edit-source-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                 |

| Returns                                                                             |
| ----------------------------------------------------------------------------------- |
| [`Promise<SubmitTranslationResponse>`](../src/types/submit-translation-response.ts) |

```javascript
const { result, versionId } = await api.keys.editSource({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  value: 'Save changes',
  sourceChanged: false,
});
```

### keys.reviewTranslation(request[, config])

Approve or reject one version of a [key](../src/types/key.ts) in one language, which may be the
source language.

`approve` makes the version current and rejects the other versions waiting for review; approving the
already-current version confirms it. `reject` rejects the version; the current version cannot be
rejected (`current_version_cannot_be_rejected`). Get `versionId` from
`translation.review.versionId` of `keys.getDetails()`.

**Check `result` on the response.** `false` means the project was momentarily locked; retry.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#review-a-translation)

| Arguments         | Type                                                                            |
| ----------------- | ------------------------------------------------------------------------------- |
| request           | [`KeyReviewTranslationRequest`](../src/types/key-review-translation-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                               |

| Returns                                                                             |
| ----------------------------------------------------------------------------------- |
| [`Promise<ReviewTranslationResponse>`](../src/types/review-translation-response.ts) |

```javascript
const [detail] = (await api.keys.getDetails({ project, keys: ['key-id'], lang: 'cs' })).keys;
const versionId = detail?.translation.review?.versionId;

if (versionId) {
  await api.keys.reviewTranslation({
    project: 'project-id', // or Project object
    key: 'key-id', // or Key object
    lang: 'cs',
    versionId,
    action: 'approve',
  });
}
```

### keys.setTags(request[, config])

Add and/or remove tags on [keys](../src/types/key.ts).

Removal is applied before addition, so a tag name present in both `addTags` and `removeTags` ends up
added. Tag names that do not exist yet are created, subject to the project's 50-tag limit. At most
1000 keys may be passed per call; larger sets are rejected outright rather than truncated, and
splitting them is the caller's responsibility.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#set-tags-on-multiple-keys)

| Arguments         | Type                                                        |
| ----------------- | ----------------------------------------------------------- |
| request           | [`KeySetTagsRequest`](../src/types/key-set-tags-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)           |

| Returns                                                    |
| ---------------------------------------------------------- |
| [`Promise<BooleanResult>`](../src/types/boolean-result.ts) |

`result` reports that the request was processed, not that it changed anything: key ids that do not
resolve within the project are skipped silently, and a call in which none of them resolve still
answers `true`.

```javascript
const { result } = await api.keys.setTags({
  project: 'project-id', // or Project object
  keys: ['key-id'], // or Key objects
  addTags: ['ui'],
  removeTags: ['legacy'],
});
```

### keys.setMetadata(request[, config])

Add and/or remove entries of the custom metadata of [keys](../src/types/key.ts), each key with its
own change. The metadata is what `files.listKeys()` returns in `metadata` with `metadata: true`.

Each top-level entry of `addMetadata` replaces the entry of the same name and keeps all others.
Removal is applied before addition, so a name present in both `addMetadata` and `removeMetadata` ends
up added. At most 1000 keys may be passed per call, each listed once and each adding or removing
something; a request that breaks these rules is rejected and changes nothing.

`files.listKeys()` leaves `metadata` out for a key whose metadata was never written. Once a write has
touched it (this method, `keys.update`, an import's `@meta` or the web app, even a removal of a name
the key didn't have), it lists an object, `{}` after the last entry was removed. Check entries, not
whether `metadata` is present.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#update-metadata-of-multiple-keys)

| Arguments         | Type                                                                |
| ----------------- | ------------------------------------------------------------------- |
| request           | [`KeySetMetadataRequest`](../src/types/key-set-metadata-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                   |

| Returns                                                                        |
| ------------------------------------------------------------------------------ |
| [`Promise<KeySetMetadataResponse>`](../src/types/key-set-metadata-response.ts) |

Each key gets its own `state`: `updated`, `not_found` (missing, deleted or in another project) or
`not_supported` (a cluster-qualified ID or a single segment of a segmented key). A key that cannot be
changed doesn't stop the others.

```javascript
const { keys } = await api.keys.setMetadata({
  project: 'project-id', // or Project object
  keys: [
    { key: 'key-id', addMetadata: { 'figma:doc': { node: '1:2' } } }, // or Key object
    { key: 'other-key-id', removeMetadata: ['figma:doc'] },
  ],
});
```

### keys.rename(request[, config])

Rename [keys](../src/types/key.ts): each key keeps its ID, translations and their history, comments,
screenshots, tags and other settings; only its name changes. The key stays in its file and keeps its
kind.

At most 1000 keys may be passed per call, each listed once. The whole request is checked first: if
one entry can't be applied, no key is renamed. A new name must not be used by another key of the
same file, deprecated keys included; keys may swap names within one call. Segmented keys, keys of
files that use key clustering, of filled-in document formats and of XLIFF imports can't be renamed.
The call fails while an import or another rename runs in the project; retry when it finishes.

Downloads and the CDN get the new names with the project's next publish. Rename the keys in your
source files too: an import of the old name creates it again as a new key.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#rename-keys)

| Arguments         | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| request           | [`KeyRenameRequest`](../src/types/key-rename-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)        |

| Returns                                                             |
| ------------------------------------------------------------------- |
| [`Promise<KeyRenameResponse>`](../src/types/key-rename-response.ts) |

Each key gets its `state`: `renamed`, or `unchanged` when it already had the name, so repeating a call
is safe. `name` is a list of segments, as `key` in `files.listKeys()`: `['checkout', 'title']` is a
nested key, `['checkout.title']` a flat key that contains a dot.

```javascript
const { keys } = await api.keys.rename({
  project: 'project-id', // or Project object
  keys: [
    { key: 'key-id', name: ['checkout', 'title'] }, // or Key object
    { key: 'other-key-id', name: ['checkout.subtitle'] },
  ],
});
```

### keys.setPriority(request[, config])

Set the priority level on [keys](../src/types/key.ts).

`normal` clears any priority currently set. At most 1000 keys may be passed per call; larger sets
are rejected outright rather than truncated, and splitting them is the caller's responsibility.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#set-priority-on-multiple-keys)

| Arguments         | Type                                                                |
| ----------------- | ------------------------------------------------------------------- |
| request           | [`KeySetPriorityRequest`](../src/types/key-set-priority-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                   |

| Returns                                                    |
| ---------------------------------------------------------- |
| [`Promise<BooleanResult>`](../src/types/boolean-result.ts) |

`result` reports that the request was processed, not that it changed anything: key ids that do not
resolve within the project are skipped silently, and a call in which none of them resolve still
answers `true`.

```javascript
const { result } = await api.keys.setPriority({
  project: 'project-id', // or Project object
  keys: ['key-id'], // or Key objects
  priority: 'high', // lowest | low | normal | high | highest
});
```

## Comments

### comments.list(request[, config])

List the discussion of a [key](../src/types/key.ts) in one language, newest first. Deleted comments
are left out, and reading does not mark comments as read. `keys.getDetails()` returns the same
comments for up to 100 keys at once.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#list-comments-of-a-key)

| Arguments         | Type                                                         |
| ----------------- | ------------------------------------------------------------ |
| request           | [`CommentListRequest`](../src/types/comment-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)            |

| Returns                                                |
| ------------------------------------------------------ |
| [`Promise<KeyComment[]>`](../src/types/key-comment.ts) |

```javascript
const comments = await api.comments.list({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  lang: 'cs',
});
```

### comments.create(request[, config])

Add a comment to the discussion of a [key](../src/types/key.ts) in one language, authored by the
token's user. It behaves like a comment written in Localazy: unread for the other users,
notifications and e-mails are sent, and the `comment_added` webhook fires. `text` must have 1 to 2000
characters and not be only white space.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#add-a-comment)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`CommentCreateRequest`](../src/types/comment-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns           | Type        |
| ----------------- | :---------- |
| `Promise<string>` | Comment id. |

```javascript
const id = await api.comments.create({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  lang: 'cs',
  text: "Is 'kus' better here?",
});
```

### comments.update(request[, config])

Replace the text of a comment. Only its author may: a comment of another user fails with `401`, even
for a manager or owner. A comment that is deleted or not on this key and language fails with `404`.
No notification or webhook is sent.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#edit-a-comment)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`CommentUpdateRequest`](../src/types/comment-update-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.comments.update({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  lang: 'cs',
  comment: 'comment-id', // or KeyComment object
  text: "Is 'kusy' better here?",
});
```

### comments.delete(request[, config])

Delete a comment. Only its author may: a comment of another user fails with `401`, even for a
manager or owner. A comment that is already deleted or not on this key and language fails with
`404`.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#delete-a-comment)

| Arguments         | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| request           | [`CommentDeleteRequest`](../src/types/comment-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.comments.delete({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  lang: 'cs',
  comment: 'comment-id', // or KeyComment object
});
```

### glossary.createMany(request[, config])

Create several [glossary records](../src/types/glossary-record.ts) in one request.

Unlike `glossary.create()`, a duplicate of an existing term is merged into it instead of being
refused: its translations and the options it sets are applied to that term. Terms are duplicates
when their trimmed source-language text and `exactMatch` match; case matters only when both are
case-sensitive. An option left out keeps the existing value on merge and takes the default on a new
term. The response lists each item, by its source-language text, as `created`, `updated` or
`skipped`. The whole batch is rejected if the created terms would exceed the 1000-term project
limit.

| Arguments         | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| request           | [`GlossaryCreateManyRequest`](../src/types/glossary-create-many-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                           |

| Returns                                                                                |
| -------------------------------------------------------------------------------------- |
| [`Promise<GlossaryCreateManyResponse>`](../src/types/glossary-create-many-response.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const { created, updated, skipped } = await api.glossary.createMany({
  project: 'project-id', // or Project object
  terms: [
    { term: [{ lang: Locales.ENGLISH, term: 'Save' }], description: 'UI action' },
    {
      term: [
        { lang: Locales.ENGLISH, term: 'Monitor' },
        { lang: Locales.CZECH, term: 'Monitor' },
      ],
    },
  ],
});
```

## Suggestions

Per-key translation suggestions. Every response shares the same envelope:

- `enabled` — whether the family could run at all. `false` means the feature is unavailable for the
  project, or the target language is the (possibly overridden) source language.
- `errors` — soft failures keyed by engine name. A soft error never fails the request. The reserved
  key `general` covers failures belonging to no single engine, most commonly the key having no value
  in the source language.
- `items` — one entry per source form: a singular key yields one entry, a plural or array key one per
  form.

Read those three deliberately: `enabled: true` with empty `items` means "ran, found nothing", which
is a different answer from `enabled: false`.

In every method `to` is required and `from` is optional, defaulting to the project's source
language. Both accept a locale code (`'pt_BR'`) or Localazy's numeric language id (`112`).

### suggestions.tm(request[, config])

Translation Memory (InTM) suggestions for a single [key](../src/types/key.ts). Free and read-only.

| Arguments         | Type                                                        |
| ----------------- | ----------------------------------------------------------- |
| request           | [`SuggestionsRequest`](../src/types/suggestions-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)           |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<TmSuggestionsResponse>`](../src/types/tm-suggestions-response.ts) |

```javascript
const response = await api.suggestions.tm({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
  to: 'cs',
});
```

### suggestions.mt(request[, config])

Machine Translation suggestions for a single [key](../src/types/key.ts).

Free to the caller, but a cache miss computes the translations live and meters them against the
organization's machine translation fair-use quota.

| Arguments         | Type                                                        |
| ----------------- | ----------------------------------------------------------- |
| request           | [`SuggestionsRequest`](../src/types/suggestions-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)           |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<MtSuggestionsResponse>`](../src/types/mt-suggestions-response.ts) |

```javascript
const response = await api.suggestions.mt({
  project: 'project-id',
  key: 'key-id',
  to: 'cs',
  from: 'en', // optional source override
});
```

### suggestions.ai(request[, config])

Localazy AI suggestions for a single [key](../src/types/key.ts).

> **This method spends AI credits** — that is why the underlying endpoint is a `POST`. Not to be
> confused with [`ai.translate`](#aitranslaterequest-config), which translates arbitrary texts you
> supply rather than an existing key.

`enabled` requires both AI suggestions and Machine Translation to be switched on in the project's
settings; producing results additionally requires an active paid MT tier, so `enabled: true` can
still yield empty `items` with no error.

| Arguments         | Type                                                        |
| ----------------- | ----------------------------------------------------------- |
| request           | [`SuggestionsRequest`](../src/types/suggestions-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)           |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<AiSuggestionsResponse>`](../src/types/ai-suggestions-response.ts) |

```javascript
const response = await api.suggestions.ai({
  project: 'project-id',
  key: 'key-id',
  to: 'cs',
});
```

## Plural keys

Plural values are objects keyed by [CLDR plural class](../src/types/plural-class.ts) (`zero`, `one`,
`two`, `few`, `many`, `other`). Which classes a language uses is defined by CLDR — English uses
`one`/`other`, Czech `one`/`few`/`many`/`other`.

Two spellings exist, and **which one you need depends on the endpoint**:

| Surface                          | Spelling                 | Example                                       |
| -------------------------------- | ------------------------ | --------------------------------------------- |
| `import.json` (write)            | `@`-prefixed             | `{ "@one": "%d item", "@other": "%d items" }` |
| `files.listKeys` (read)          | `@`-prefixed             | `{ "@one": "%d item", "@other": "%d items" }` |
| `keys.submitTranslation` (write) | plain, `@` also accepted | `{ "one": "%d item", "other": "%d items" }`   |

### `plural()` — spell it once

`plural()` tags a value as a plural explicitly, so the client can render the right spelling for
whichever endpoint receives it. This is the recommended way to author plural values by hand.

```javascript
import { plural } from '@localazy/api-client';

// import  -> { "ITEMS": { "@one": "%d item", "@other": "%d items" } }
await api.import.json({
  project,
  json: { en: { ITEMS: plural({ one: '%d item', other: '%d items' }) } },
});

// submit  -> { "value": { "one": "%d élément", "other": "%d éléments" } }
await api.keys.submitTranslation({
  project,
  key,
  lang: 'fr',
  value: plural({ one: '%d élément', other: '%d éléments' }),
});
```

| Arguments | Type                                          |
| --------- | --------------------------------------------- |
| forms     | [`PluralValue`](../src/types/plural-class.ts) |

| Returns                                         |
| ----------------------------------------------- |
| [`PluralMarker`](../src/types/plural-marker.ts) |

You always write plain CLDR classes; the `@` prefix is added only where the wire format needs it.
Raw objects keep working unchanged, so nothing existing breaks — `plural()` is opt-in.

Two things worth knowing:

- The marker is resolved before the import payload is chunked, so it never reaches the wire. If you
  ever see `__localazyPlural` in a request body, a marker escaped unresolved — that is a bug, and it
  is deliberately a visible string rather than a symbol so it fails loudly instead of serializing to
  an empty object.
- `plural()` only affects values you construct. A value read back from `files.listKeys()` is a plain
  `@`-prefixed object, and `keys.submitTranslation` normalises that on its own.

### The `@` prefix is a disambiguator, not decoration

On import, the prefix is the _only_ thing separating a plural key from a nested key group. Omitting
it does not fail — it silently creates something else:

```javascript
// ✅ ONE plural key `ITEMS` with classes one/other
await api.import.json({
  project,
  json: { en: { ITEMS: { '@one': '%d item', '@other': '%d items' } } },
});

// ❌ TWO nested singular keys `ITEMS.one` and `ITEMS.other`
await api.import.json({
  project,
  json: { en: { ITEMS: { one: '%d item', other: '%d items' } } },
});
```

Both are valid JSON and valid TypeScript, so nothing catches the second form — it is a legitimate
way to declare nested keys, which is exactly why the client cannot add the prefix for you. Using
[`plural()`](#pluralforms) removes the choice, and with it the mistake.

### Submitting a plural translation

`keys.submitTranslation` needs no prefix: the key is identified in the URL, so its form is already
known and an object value can only mean plural classes. The `@`-prefixed form is accepted too and
the prefix is stripped before sending, so a value read from `files.listKeys()` round-trips safely:

```javascript
const keys = await api.files.listKeys({ project, file, lang: 'en' });
const key = keys.find((k) => k.key[0] === 'ITEMS');
// key.value === { '@one': '%d item', '@other': '%d items' }

await api.keys.submitTranslation({
  project,
  key,
  lang: 'fr',
  value: { one: '%d élément', other: '%d éléments' }, // or the '@'-prefixed form
});
```

### What the types check

`TranslationValue` uses the real CLDR classes, so a typo is a compile error — but only in an object
_literal_:

```typescript
value: { one: '1', otehr: 'n' }  // ✗ TS2353: 'otehr' does not exist
value: someRecord                // ✓ compiles — Key.value is Record<string, any>
```

Excess-property checking does not apply to values held in variables, so a value round-tripped from
the read API is never inspected by the compiler. That path is safe because the client normalises it
at runtime, not because the types verified it.

This is the gap [`plural()`](#pluralforms) closes on the import side: the compiler cannot tell a
plural from a nested key group, because both are well-typed — but a tagged value carries the intent
regardless of shape.

## Import

### import.json(request[, config])

Import JSON object as source keys.

Declaring plural keys requires `@`-prefixed CLDR classes — see [Plural keys](#plural-keys). Without
the prefix you get nested keys instead, with no error.

See: [Localazy API Docs](https://localazy.com/docs/api/import#import-content-to-a-project)

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`ImportJsonRequest`](../src/types/import-json-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns         | Type                           |
| --------------- | :----------------------------- |
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
    deprecate: I18nDeprecate.NONE,
  },
  fileOptions: {
    name: 'translations.json',
    path: 'path/to/dir',
    module: 'i18n',
    buildType: '',
    productFlavors: [],
  },
});
```

## Export

### export.json(request[, config])

Export translated keys as JSON object.

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`ExportJsonRequest`](../src/types/export-json-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns             | Type                                    |
| ------------------- | :-------------------------------------- |
| `Promise<I18nJson>` | [`I18nJson`](../src/types/i18n-json.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const json = await api.export.json({
  project: 'project-id', // or Project object
  file: 'file-id', // or File object
  langs: [Locales.ENGLISH],
});
```

## Formats

### formats.list([config])

List all [formats](../src/types/format.ts) and related options.

See: [Localazy API Docs](https://localazy.com/docs/api/import#list-available-file-types)

| Arguments         | Type                                              |
| ----------------- | ------------------------------------------------- |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts) |

| Returns             | Type                               |
| ------------------- | :--------------------------------- |
| `Promise<Format[]>` | [`Format`](../src/types/format.ts) |

```javascript
const formats = await api.formats.list();
```

## Languages

Languages are passed as a locale code (`pt_BR`; `pt-BR` works too) or Localazy's numeric language id
(`112`). An unknown region falls back to the plain language (`pt-XX` resolves to `pt`); every response
echoes the resolved `code`. The project's source language can't be hidden, enabled, disabled, deleted,
copied onto or replaced. Read the languages back with `projects.list({ languages: true })`, adding
`hidden_languages: true` to also list hidden ones.

### languages.add(request[, config])

Add target languages to the project. They are added empty: nothing is translated and no publish is
triggered. A hidden language comes back with its previous translations, published.

Up to 100 languages per call. One that can't be resolved rejects the whole request; after that the
languages are added one by one, so a failure part-way can leave the earlier ones added. Repeating the
call is safe.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#add-languages)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`LanguagesBatchRequest`](../src/types/languages-batch-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns                                                                 |
| ----------------------------------------------------------------------- |
| [`Promise<LanguageAddResponse>`](../src/types/language-add-response.ts) |

Each language gets its `state`: `created`, `restored` (it was hidden) or `unchanged` (already listed).

```javascript
import { Locales } from '@localazy/api-client';

const { languages } = await api.languages.add({
  project: 'project-id', // or Project object
  languages: [Locales.BRAZILIAN_PORTUGUESE, 'cs'],
});
```

### languages.hide(request[, config])

Hide languages: they leave the project (not listed, translated or published) but keep their
translations, which come back when the language is added again. To remove the translations too, use
[`languages.delete`](#languagesdeleterequest-config).

Up to 100 languages per call, all of which must be in the project; otherwise nothing changes.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#hide-languages)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`LanguagesBatchRequest`](../src/types/languages-batch-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns                                                                   |
| ------------------------------------------------------------------------- |
| [`Promise<LanguageHideResponse>`](../src/types/language-hide-response.ts) |

Each language gets its `state`: `hidden`, or `unchanged` when it already was.

```javascript
await api.languages.hide({
  project: 'project-id', // or Project object
  languages: ['cs'],
});
```

### languages.enable(request[, config])

Include languages when the project is published (the `published` flag of
[`Language`](../src/types/language.ts)). This doesn't change whether a language is in the project.
Adding a hidden language back also enables it.

Up to 100 languages per call, all of which must be in the project; otherwise nothing changes.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#enable-and-disable-publishing)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`LanguagesBatchRequest`](../src/types/languages-batch-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns                                                                       |
| ----------------------------------------------------------------------------- |
| [`Promise<LanguageEnableResponse>`](../src/types/language-enable-response.ts) |

Each language gets its `state`: `enabled`, or `unchanged` when it already was.

```javascript
await api.languages.enable({
  project: 'project-id', // or Project object
  languages: ['cs'],
});
```

### languages.disable(request[, config])

Leave languages out when the project is published. They stay in the project and translatable, but
their "new strings to translate" and "new translations to review" e-mails stop.

Up to 100 languages per call, all of which must be in the project; otherwise nothing changes.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#enable-and-disable-publishing)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`LanguagesBatchRequest`](../src/types/languages-batch-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns                                                                         |
| ------------------------------------------------------------------------------- |
| [`Promise<LanguageDisableResponse>`](../src/types/language-disable-response.ts) |

Each language gets its `state`: `disabled`, or `unchanged` when it already was.

```javascript
await api.languages.disable({
  project: 'project-id', // or Project object
  languages: ['cs'],
});
```

### languages.delete(request[, config])

Permanently delete a language **and all of its translations**, comments and style guide. There is no
undo. To keep the translations, use [`languages.hide`](#languageshiderequest-config).

It runs while the request is open, so expect a slow response on a large project. It fails with `409`
while another delete, copy or replace runs in the project, or while another language falls back to
this one.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#delete-a-language)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`LanguageDeleteRequest`](../src/types/language-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns                                                    |
| ---------------------------------------------------------- |
| [`Promise<BooleanResult>`](../src/types/boolean-result.ts) |

```javascript
await api.languages.delete({
  project: 'project-id', // or Project object
  lang: 'cs',
});
```

### languages.copy(request[, config])

Add a language pre-filled with a snapshot of the translations of another one, for example `pt_BR` into
`pt_PT`. The copy is always published and independent of the original afterwards.

`from` must be in the project and not hidden; `to` must not be in the project, unless it is hidden:
then its kept translations are destroyed first, and stay destroyed if the copy then fails (it can fail
with `500` on very large projects). It fails with `409` while another delete, copy or replace runs in
the project.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#copy-a-language)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`LanguageCopyRequest`](../src/types/language-copy-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns                                                                   |
| ------------------------------------------------------------------------- |
| [`Promise<LanguageCopyResponse>`](../src/types/language-copy-response.ts) |

```javascript
const { language } = await api.languages.copy({
  project: 'project-id', // or Project object
  from: 'pt_BR',
  to: 'pt_PT',
});
```

### languages.replace(request[, config])

Move all translations of `language` to `replaceWith`, for example `de` to `de_AT`. `language` stops
existing; `replaceWith` takes over its state, publish flag and fallbacks included.

`language` must be in the project and not hidden; `replaceWith` must not be in the project, unless it
is hidden: then its kept translations are destroyed first. It fails with `409` while another delete,
copy or replace runs in the project, or when the move would make a cycle of fallback languages.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#replace-a-language)

| Arguments         | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| request           | [`LanguageReplaceRequest`](../src/types/language-replace-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                    |

| Returns                                                    |
| ---------------------------------------------------------- |
| [`Promise<BooleanResult>`](../src/types/boolean-result.ts) |

```javascript
await api.languages.replace({
  project: 'project-id', // or Project object
  language: 'de',
  replaceWith: 'de_AT',
});
```

### languages.setFallback(request[, config])

Set the fallback language of a language, or remove it with `fallback: null`. Output files take the text
of a key untranslated in `lang` from its fallback; key listings and the editor never do. Fallbacks
chain, and each chain ends at the source language. A change publishes the project again.

The fallback must be a language of the project (hidden or unpublished ones too), not `lang` itself, and
must not make a cycle. Setting one fails with `unpaid` when the organization lacks the feature;
removing one always works.

See: [Localazy API Docs](https://localazy.com/docs/api/project-languages#set-a-fallback-language)

| Arguments         | Type                                                                          |
| ----------------- | ----------------------------------------------------------------------------- |
| request           | [`LanguageSetFallbackRequest`](../src/types/language-set-fallback-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                             |

| Returns                                                    |
| ---------------------------------------------------------- |
| [`Promise<BooleanResult>`](../src/types/boolean-result.ts) |

```javascript
await api.languages.setFallback({
  project: 'project-id', // or Project object
  lang: 'pt_PT',
  fallback: 'pt_BR', // or null to remove it
});
```

### languages.listKeys(request[, config])

List all [keys](../src/types/language-key.ts) of **all files** of the project with their values in one
language. It takes the same options as `files.listKeys`, plus `unapproved` and `resolve_duplicities`;
each key also has the ID of its `file`.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-keys-of-all-files)

| Arguments         | Type                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| request           | [`LanguageListKeysRequest`](../src/types/language-list-keys-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                       |

| Returns                  | Type                                          |
| ------------------------ | :-------------------------------------------- |
| `Promise<LanguageKey[]>` | [`LanguageKey`](../src/types/language-key.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = await api.languages.listKeys({
  project: 'project-id', // or Project object
  lang: Locales.CZECH,
});
```

### languages.listKeysPage(request[, config])

List one page of [keys](../src/types/language-key.ts) of all files of the project with their values in
one language. `files` describes, by file ID, the files of the keys on the page; one file can continue
on the next page.

See: [Localazy API Docs](https://localazy.com/docs/api/files#list-keys-of-all-files)

| Arguments         | Type                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| request           | [`LanguageListKeysRequest`](../src/types/language-list-keys-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                       |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<LanguageKeysPaginated>`](../src/types/language-keys-paginated.ts) |

```javascript
import { Locales } from '@localazy/api-client';

const keys = [];
let next;

do {
  const page = await api.languages.listKeysPage({
    project: 'project-id', // or Project object
    lang: Locales.CZECH,
    limit: 10000,
    next,
  });
  keys.push(...page.keys);
  next = page.next;
} while (next);
```

### languages.listPlurals(request[, config])

Get the plural rules the project defines in place of the standard ones, and the plural forms each
project language uses as a result: which forms a plural value needs in each language. The source
language is first.

See: [Localazy API Docs](https://localazy.com/docs/api/project-styleguides-plurals#get-plurals)

| Arguments         | Type                                                         |
| ----------------- | ------------------------------------------------------------ |
| request           | [`PluralsListRequest`](../src/types/plurals-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)            |

| Returns                                       |
| --------------------------------------------- |
| [`Promise<Plurals>`](../src/types/plurals.ts) |

```javascript
const { languages } = await api.languages.listPlurals({
  project: 'project-id', // or Project object
});
const czechForms = languages.find(({ lang }) => lang === 'cs')?.forms; // ['one', 'few', 'other']
```

## Styleguides

### styleguides.list(request[, config])

Get the project's style guides: `general` for all languages (absent when unset) and `languages`, one per
language code. Empty or blank style guides count as unset. This API cannot change style guides.

See: [Localazy API Docs](https://localazy.com/docs/api/project-styleguides-plurals#get-style-guides)

| Arguments         | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| request           | [`StyleguidesListRequest`](../src/types/styleguides-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                    |

| Returns                                               |
| ----------------------------------------------------- |
| [`Promise<Styleguides>`](../src/types/styleguides.ts) |

```javascript
const { general, languages } = await api.styleguides.list({
  project: 'project-id', // or Project object
});
```

## CDN

### cdn.list(request[, config])

List the URLs of the CDN metadata files (`.v2.json`) of `latest` and of each published release tag.
When the CDN is disabled for the project, `enabled` is `false` and the list is empty.

See: [Localazy API Docs](https://localazy.com/docs/api/cdn#list-metadata-files)

| Arguments         | Type                                                 |
| ----------------- | ---------------------------------------------------- |
| request           | [`CdnListRequest`](../src/types/cdn-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)    |

| Returns                                                |
| ------------------------------------------------------ |
| [`Promise<CdnMetadata>`](../src/types/cdn-metadata.ts) |

```javascript
const { enabled, metadataUrls } = await api.cdn.list({
  project: 'project-id', // or Project object
});
```

## Branches

A branch is a copy of a project that is changed and translated independently and then merged into
another branch. Each branch is a project of its own, with its own `projectId`, tokens and members;
the first one is the main branch, named `main`. In these methods `project` can be any branch of the
project, and the other branches are addressed by name (or by a [`Branch`](../src/types/branch.ts)
object). To read or change the content of a branch, pass its `projectId` as `project` to the other
namespaces.

Branching is a feature of the organization's plan; without it every method rejects with `400`
(`unpaid`).

### branches.list(request[, config])

List all [branches](../src/types/branch.ts) of the project: `main` first, then the others by name.
The result is the same whichever branch `project` addresses.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#list-branches)

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`BranchListRequest`](../src/types/branch-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns             | Type                               |
| ------------------- | :--------------------------------- |
| `Promise<Branch[]>` | [`Branch`](../src/types/branch.ts) |

```javascript
const branches = await api.branches.list({
  project: 'project-id', // or Project object
});
```

### branches.create(request[, config])

Create a branch as a full copy of `source` (default: the branch `project` addresses), or with
`empty: true` a copy of its settings only. `name` has 2 to 32 characters from `a-z`, `0-9`, `_`, `-`
and `.`, and cannot start with `_` or `-`; `main` is reserved. A project can have 20 branches, and a
project that uses segmentation cannot have any.

The copy runs in the background and resolves with an operation ID. Poll
[`branches.getOperation()`](#branchesgetoperationrequest-config) until the status is `done` (the
branch then appears in `branches.list()`) or `error`.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#create-a-branch)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`BranchCreateRequest`](../src/types/branch-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns           | Description   |
| ----------------- | :------------ |
| `Promise<string>` | Operation ID. |

```javascript
const operation = await api.branches.create({
  project: 'project-id', // or Project object
  name: 'release-2',
  source: 'main', // optional, or Branch object
});
```

### branches.rename(request[, config])

Rename a branch. Its `projectId` stays; its slug ends with `!<new name>`. The main branch cannot be
renamed; use `branches.setMain()` instead.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#rename-a-branch)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`BranchRenameRequest`](../src/types/branch-rename-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.branches.rename({
  project: 'project-id', // or Project object
  branch: 'release-2', // or Branch object
  name: 'release-3',
});
```

### branches.delete(request[, config])

Delete a branch: its project is archived with all its content. Rejected for the main branch, a
branch that other branches were made from, the source of linked keys, a branch whose glossary or
translation memory other projects use, and while duplicity resolution runs for it.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#delete-a-branch)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`BranchDeleteRequest`](../src/types/branch-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.branches.delete({
  project: 'project-id', // or Project object
  branch: 'release-2', // or Branch object
});
```

### branches.setMain(request[, config])

Make `branch` the main branch. No content moves: `branch` takes the name `main` and the old main
slug, and the old main branch takes `name`. Every `projectId` stays, so a branch token keeps
addressing the same content although the name of its branch may change.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#set-the-main-branch)

| Arguments         | Type                                                              |
| ----------------- | ----------------------------------------------------------------- |
| request           | [`BranchSetMainRequest`](../src/types/branch-set-main-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                 |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.branches.setMain({
  project: 'project-id', // or Project object
  branch: 'release-2', // or Branch object
  name: 'legacy', // new name of the former main branch
});
```

### branches.separate(request[, config])

Turn a branch into an independent project. It keeps its `projectId` and content, loses the
`!<name>` slug suffix, disappears from `branches.list()` and can no longer be merged with the
project's branches. Branches made from it move to its own source. The main branch cannot be
separated.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#separate-a-branch)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`BranchSeparateRequest`](../src/types/branch-separate-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.branches.separate({
  project: 'project-id', // or Project object
  branch: 'release-2', // or Branch object
});
```

### branches.analyzeMerge(request[, config])

Report what `branches.merge()` with the same request would do, changing nothing. Keys are matched
by file and key name. A translation that differs between the branches is handled by `strategy`
(default `skip`; see [`BranchMergeStrategy`](../src/types/branch-merge-strategy.ts)); one the
strategy does not resolve is a conflict and is never merged. `details` adds the lists of conflicts
and/or failures, which have no length limit.

The analysis is synchronous and reads every current translation of both branches, so it can take a
long time on a large project. Only one analysis or merge can run on a target branch at a time,
including ones started in Localazy or the CLI; another request fails with `409`.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#analyze-a-merge)

| Arguments         | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| request           | [`BranchAnalyzeMergeRequest`](../src/types/branch-analyze-merge-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                           |

| Returns                                                                 |
| ----------------------------------------------------------------------- |
| [`Promise<BranchMergeAnalysis>`](../src/types/branch-merge-analysis.ts) |

```javascript
const analysis = await api.branches.analyzeMerge({
  project: 'project-id', // or Project object
  branch: 'release-2', // source branch, or Branch object
  target: 'main', // or Branch object
  strategy: 'reference',
  details: ['conflicts'],
});
```

### branches.merge(request[, config])

Merge `branch` into `target`. Takes the same request as `branches.analyzeMerge()` (without
`details`); run the analysis first, because a merge cannot be reverted and the `target` and
`time-bidi` strategies also write back to the source branch.

The merge runs in the background and resolves with an operation ID. Poll
[`branches.getOperation()`](#branchesgetoperationrequest-config) until the status is `done` (with the
merge counts) or `error`.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#merge-branches)

| Arguments         | Type                                                         |
| ----------------- | ------------------------------------------------------------ |
| request           | [`BranchMergeRequest`](../src/types/branch-merge-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)            |

| Returns           | Description   |
| ----------------- | :------------ |
| `Promise<string>` | Operation ID. |

```javascript
const operation = await api.branches.merge({
  project: 'project-id', // or Project object
  branch: 'release-2', // source branch, or Branch object
  target: 'main', // or Branch object
  strategy: 'reference',
});
```

### branches.getOperation(request[, config])

Get the status of an operation started by `branches.create()` or `branches.merge()`. Poll while
`status` is `scheduled` or `in_progress`; `done` and `error` are final. A merge that is `done` also
carries its counts. An ID that is unknown, older than 48 hours or started by another project
resolves with status `invalid_id`; only a malformed ID rejects.

See: [Localazy API Docs](https://localazy.com/docs/api/branching#check-the-status-of-an-operation)

| Arguments         | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| request           | [`BranchGetOperationRequest`](../src/types/branch-get-operation-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                           |

| Returns                                                                     |
| --------------------------------------------------------------------------- |
| [`Promise<BranchOperationStatus>`](../src/types/branch-operation-status.ts) |

```javascript
const operation = await api.branches.merge({ project, branch: 'release-2', target: 'main' });

let status = await api.branches.getOperation({ project, operation });
while (status.status === 'scheduled' || status.status === 'in_progress') {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  status = await api.branches.getOperation({ project, operation });
}
```

## Links

### links.list(request[, config])

List all [key links](../src/types/link.ts) in the project, following the `next` cursor until the last page.

See: [Localazy API Docs](https://localazy.com/docs/api/duplicities#list-links)

| Arguments         | Type                                                   |
| ----------------- | ------------------------------------------------------ |
| request           | [`LinkListRequest`](../src/types/link-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)      |

| Returns           | Type                           |
| ----------------- | :----------------------------- |
| `Promise<Link[]>` | [`Link`](../src/types/link.ts) |

```javascript
const links = await api.links.list({
  project: 'project-id', // or Project object
});
```

### links.listPage(request[, config])

List [key links](../src/types/link.ts) in the project. Result is paginated.

See: [Localazy API Docs](https://localazy.com/docs/api/duplicities#list-links)

| Arguments         | Type                                                   |
| ----------------- | ------------------------------------------------------ |
| request           | [`LinkListRequest`](../src/types/link-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)      |

| Returns                   | Type                                                |
| ------------------------- | :-------------------------------------------------- |
| `Promise<LinksPaginated>` | [`LinksPaginated`](../src/types/links-paginated.ts) |

```javascript
const links = [];
let pageResult = { links: [], next: '' };

do {
  pageResult = await api.links.listPage({
    project: 'project-id', // or Project object
    next: pageResult.next,
  });
  links.push(...pageResult.links);
} while (pageResult.next);
```

### links.create(request[, config])

Link a [key](../src/types/key.ts) to a target key in the same project or another one. The linked key
becomes hidden and publishes the target's content while the link exists.

Links are honoured during publishing only on the Business plan and above; on other plans they are
stored but ignored. A segmented key as a whole cannot be linked on either side (its individual
segments can), and a key or target that does not exist rejects with `unauthorized`.

See: [Localazy API Docs](https://localazy.com/docs/api/duplicities#create-links)

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`LinkCreateRequest`](../src/types/link-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.links.create({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object; the key that becomes linked
  linkedKey: 'target-key-id', // or Key object
  linkedProject: 'target-project', // optional, defaults to `project`
});
```

### links.delete(request[, config])

Remove the link of a [key](../src/types/key.ts). A segmented key as a whole is rejected.

See: [Localazy API Docs](https://localazy.com/docs/api/duplicities#remove-links)

| Arguments         | Type                                                       |
| ----------------- | ---------------------------------------------------------- |
| request           | [`LinkDeleteRequest`](../src/types/link-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)          |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.links.delete({
  project: 'project-id', // or Project object
  key: 'key-id', // or Key object
});
```

## Segmentation

### segmentation.getParent(request[, config])

Get a text-segmentation [parent](../src/types/segmentation-parent.ts): the key a set of segments
reassembles into, with its segment ids and the whole text in `lang`. Use it to turn the `segParentId`
of a segment back into its key.

`parent` accepts either the parent id (`segParentId`) or the parent handle (the id of a segmented key
in the default mode of `files.listKeys()`); a deprecated parent is addressable only by its parent id.
An unknown id, a parent of another project and a project without segmentation all reject with
`unauthorized`; an unknown `lang` rejects with `unknown_lang`.

| Arguments         | Type                                                                              |
| ----------------- | --------------------------------------------------------------------------------- |
| request           | [`SegmentationGetParentRequest`](../src/types/segmentation-get-parent-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                                 |

| Returns                       | Type                                                        |
| ----------------------------- | :---------------------------------------------------------- |
| `Promise<SegmentationParent>` | [`SegmentationParent`](../src/types/segmentation-parent.ts) |

`value` is absent for a deprecated parent, whose `segments` are empty. Each segment contributes its
translation when it has one and its source text otherwise, so a partly translated key comes back mixed.

```javascript
import { Locales } from '@localazy/api-client';

const parent = await api.segmentation.getParent({
  project: 'project-id', // or Project object
  parent: 'seg-parent-id', // or the parent handle / Key object
  lang: Locales.BRAZILIAN_PORTUGUESE,
});
```

## Tags

### tags.list(request[, config])

List all [tags](../src/types/project-tag.ts) that keys of the project can have: the tags Localazy
defines for each project (`builtIn`) first, then the project's own. Not paginated. Screenshot tags are
separate, see `screenshots.listTags()`.

See: [Localazy API Docs](https://localazy.com/docs/api/source-keys#list-tags-of-a-project)

| Arguments         | Type                                                                |
| ----------------- | ------------------------------------------------------------------- |
| request           | [`ProjectTagListRequest`](../src/types/project-tag-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                   |

| Returns                 | Type                                        |
| ----------------------- | :------------------------------------------ |
| `Promise<ProjectTag[]>` | [`ProjectTag`](../src/types/project-tag.ts) |

```javascript
const tags = await api.tags.list({
  project: 'project-id', // or Project object
});
```

## Screenshots

### screenshots.list(request[, config])

List all [screenshots](../src/types/screenshot.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#list-screenshots)

| Arguments         | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| request           | [`ScreenshotsListRequest`](../src/types/screenshots-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                    |

| Returns                 | Type                                       |
| ----------------------- | :----------------------------------------- |
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
| ----------------- | ----------------------------------------------------------------------------- |
| request           | [`ScreenshotsListTagsRequest`](../src/types/screenshots-list-tags-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                             |

| Returns                    | Type                                              |
| -------------------------- | :------------------------------------------------ |
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
| ----------------- | ---------------------------------------------------------------------- |
| request           | [`ScreenshotCreateRequest`](../src/types/screenshot-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                      |

| Returns           | Type           |
| ----------------- | :------------- |
| `Promise<string>` | Screenshot id. |

```javascript
const id = await api.screenshots.create({
  project: 'project-id', // or Project object
  encodedData: 'data:image/jpg;base64,...',
});
```

### screenshots.updateImageData(request[, config])

Update the image data of [screenshot](../src/types/screenshot.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#update-the-image-of-an-existing-screenshot)

| Arguments         | Type                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| request           | [`ScreenshotUpdateImageDataRequest`](../src/types/screenshot-update-image-data-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                                          |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.screenshots.updateImageData({
  project: 'project-id', // or Project object
  encodedData: 'data:image/jpg;base64,...',
});
```

### screenshots.update(request[, config])

Update [screenshot](../src/types/screenshot.ts).
Image data are updated with `screenshots.updateImageData`.

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#update-an-existing-screenshot)

| Arguments         | Type                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| request           | [`ScreenshotUpdateRequest`](../src/types/screenshot-update-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                      |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.screenshots.update({
  project: 'project-id', // or Project object
  screenshot: 'screenshot-id', // or Screenshot object
  comment: 'Customers list.',
  tags: ['customers'],
});
```

### screenshots.delete(request[, config])

Delete [screenshot](../src/types/screenshot.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/screenshot-management#delete-a-screenshot)

| Arguments         | Type                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| request           | [`ScreenshotDeleteRequest`](../src/types/screenshot-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                      |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.screenshots.delete({
  project: 'project-id', // or Project object
  screenshot: 'screenshot-id', // or Screenshot object
});
```

## Glossary

### glossary.list(request[, config])

List all [glossary records](../src/types/glossary-record.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#list-all-glossary-terms)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`GlossaryListRequest`](../src/types/glossary-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns                     | Type                                                |
| --------------------------- | :-------------------------------------------------- |
| `Promise<GlossaryRecord[]>` | [`GlossaryRecord`](../src/types/glossary-record.ts) |

```javascript
const glossaryRecords = await api.glossary.list({
  project: 'project-id', // or Project object
});
```

### glossary.find(request[, config])

Find [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#get-glossary-term)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`GlossaryFindRequest`](../src/types/glossary-find-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns                   | Type                                                |
| ------------------------- | :-------------------------------------------------- |
| `Promise<GlossaryRecord>` | [`GlossaryRecord`](../src/types/glossary-record.ts) |

```javascript
const glossaryRecord = await api.glossary.find({
  project: 'project-id', // or Project object
  glossaryRecord: 'glossary-record-id', // or GlossaryRecord object
});
```

### glossary.create(request[, config])

Create [glossary record](../src/types/glossary-record.ts).

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#create-new-glossary-term)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`GlossaryCreateRequest`](../src/types/glossary-create-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns           | Type               |
| ----------------- | :----------------- |
| `Promise<string>` | GlossaryRecord id. |

```javascript
import { Locales } from '@localazy/api-client';

const id = await api.glossary.create({
  project: 'project-id', // or Project object
  description: 'Term description',
  caseSensitive: true,
  translateTerm: true,
  term: [{ lang: Locales.ENGLISH, term: 'befitting' }],
});
```

### glossary.update(request[, config])

Update [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#update-glossary-term)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`GlossaryUpdateRequest`](../src/types/glossary-update-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
import { Locales } from '@localazy/api-client';

await api.glossary.update({
  project: 'project-id', // or Project object
  glossaryRecord: 'glossary-record-id', // or GlossaryRecord object
  description: 'Term description',
  caseSensitive: true,
  translateTerm: true,
  term: [{ lang: Locales.ENGLISH, term: 'befitting' }],
});
```

### glossary.delete(request[, config])

Delete [glossary record](../src/types/glossary-record.ts) specified by `id`.

See: [Localazy API Docs](https://localazy.com/docs/api/glossary#delete-glossary-term)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`GlossaryDeleteRequest`](../src/types/glossary-delete-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns         |
| --------------- |
| `Promise<void>` |

```javascript
await api.glossary.delete({
  project: 'project-id', // or Project object
  glossaryRecord: 'glossary-record-id', // or GlossaryRecord object
});
```

## Webhooks

### webhooks.list(request[, config])

List all [webhooks](../src/types/webhook.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#list-webhooks-configuration)

| Arguments         | Type                                                           |
| ----------------- | -------------------------------------------------------------- |
| request           | [`WebhooksListRequest`](../src/types/webhooks-list-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)              |

| Returns              | Type                                 |
| -------------------- | :----------------------------------- |
| `Promise<Webhook[]>` | [`Webhook`](../src/types/webhook.ts) |

```javascript
const webhooks = await api.webhooks.list({
  project: 'project-id', // or Project object
});
```

### webhooks.update(request[, config])

Update all [webhooks](../src/types/webhook.ts) in the project.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#update-webhooks-configuration)

| Arguments         | Type                                                               |
| ----------------- | ------------------------------------------------------------------ |
| request           | [`WebhooksUpdateRequest`](../src/types/webhooks-update-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                  |

| Returns         |
| --------------- |
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
  ],
});
```

### webhooks.getSecret(request[, config])

Get secret for [webhooks](../src/types/webhook.ts) in the project.
Localazy signs the webhook events it sends to your endpoints and adds a signature in the request
header https://localazy.com/docs/api/webhooks-api#security.

See: [Localazy API Docs](https://localazy.com/docs/api/webhooks-api#webhook-secrets)

| Arguments         | Type                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| request           | [`WebhooksGetSecretRequest`](../src/types/webhooks-get-secret-request.ts) |
| config `optional` | [`RequestConfig`](../src/types/request-config.ts)                         |

| Returns                   | Type                                                |
| ------------------------- | :-------------------------------------------------- |
| `Promise<WebhooksSecret>` | [`WebhooksSecret`](../src/types/webhooks-secret.ts) |

```javascript
const secret = await api.webhooks.getSecret({
  project: 'project-id', // or Project object
});
```
