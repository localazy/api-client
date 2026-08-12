# API Client Reference

## Table of Contents

- [Setup](#setup)
- [AI Translation](#ai-translation)
  - [ai.translate](#aitranslaterequest-config)
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
  - [keys.deprecate](#keysdeprecaterequest-config)
  - [keys.submitTranslation](#keyssubmittranslationrequest-config)
  - [keys.setTags](#keyssettagsrequest-config)
  - [keys.setPriority](#keyssetpriorityrequest-config)
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
