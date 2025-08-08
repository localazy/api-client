<div align="center">

[<img src="https://localazy.com/directus9/assets/9fc36b9c-81b7-4dbf-bd82-b64cd984090f" width="285" height="50" alt="Localazy" >](https://localazy.com)

### 📦 `@localazy/api-client`

Node.js client for the [Localazy API](https://localazy.com/docs/api), providing a simple and type-safe way to integrate localization features into your JavaScript and TypeScript projects.

[![npm](.github/badges/version.svg)](https://www.npmjs.com/package/@localazy/api-client)
[![maintainer](.github/badges/maintainer.svg)](https://github.com/localazy)
[![license](.github/badges/license.svg)](https://github.com/localazy/api-client/blob/main/LICENSE)<br>
[![coverage](.github/badges/coverage.svg)](https://github.com/localazy/api-client/actions)
[![size](.github/badges/size.svg)](https://bundlephobia.com/package/@localazy/api-client)

</div>

## 🔧 Install

```bash
npm install @localazy/api-client
# or you can use yarn or pnpm
```

## 🚀 Usage

###### ESM

```javascript
import { ApiClient } from '@localazy/api-client';

const json = { en: { tooltip: 'Elegant unicorn' } }; // Get text to translate.

const api = new ApiClient({ authToken: 'your-project-token' }); // Create Api client.
const project = await api.projects.first(); // Get Localazy project.
const file = await api.import.json({ project, json }); // Import source keys.
const fr = await api.export.json({ project, file, langs: ['fr'] }); // Export translated keys.

console.log(fr); // 🦄 { fr: { tooltip: 'Licorne élégante' } }
```

###### TypeScript

```javascript
import { ApiClient, Project, I18nJson, Locales } from '@localazy/api-client';

const json: I18nJson = { en: { tooltip: 'Elegant unicorn' } };

const api: ApiClient = new ApiClient({ authToken: 'your-project-token' });
const project: Project = await api.projects.first();
const file: File = await api.import.json({ project, json: json });
const fr: I18nJson = await api.export.json({ project, file, langs: [Locales.FRENCH] });
```

## 🔐 Project Token

You can obtain the project token at https://localazy.com/developer/tokens.

The project token is permitted to read and write to the single project.

## 📚 Documentation

- [API Client reference](docs/api-client-reference.md)
- [Examples](examples)
- [Migration guide from `ts-api@1.x.x` to `api-client@2.0.0`](docs/migration-guide-from-v1-to-v2.md)
- [Changelog](CHANGELOG.md)

## ℹ️ Links

- [Localazy API documentation](https://localazy.com/docs/api)
- [Articles about the Localazy API](https://localazy.com/tags/api)

## 🛟 Support

Join the [Localazy Discussion Forum](https://discuss.localazy.com/) to discuss all things localization.

If you encounter any problems or have questions, you can use our forum, GitHub issues or contact us at
team@localazy.com.

## ❤️ Localazy Ecosystem

Check out other npm packages from Localazy:

|                                                                                                                                  | NPM package                                                                      | Description                                  |
| :------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| <img src="https://localazy.com/directus9/assets/3f76ff7b-0e74-4046-bb03-4ca99c3b66d5" width="50" height="50" alt="cli">          | [@localazy/cli](https://www.npmjs.com/package/@localazy/cli)                     | Localazy CLI tool.                           |
| <img src="https://localazy.com/directus9/assets/20866781-e69b-4e01-9456-05437487b75c" width="50" height="50" alt="localazy-api"> | [@localazy/api-client](https://www.npmjs.com/package/@localazy/api-client)       | Localazy API client.                         |
| <img src="https://localazy.com/directus9/assets/c9e70e4f-8136-432a-8d82-53c3501a9eb4" width="50" height="50" alt="languages">    | [@localazy/languages](https://www.npmjs.com/package/@localazy/languages)         | List of all languages supported by Localazy. |
| <img src="https://localazy.com/directus9/assets/1dd05c76-e517-4aea-a3d8-49cfddb40056" width="50" height="50" alt="strapi">       | [@localazy/strapi-plugin](https://www.npmjs.com/package/@localazy/strapi-plugin) | The official Localazy Strapi plugin.         |

Discover all available [integration options and localization examples](https://github.com/localazy).

## 📜 License

Code released under the [MIT license](LICENSE).
