# 📦 `@localazy/api-client` examples

Node 16+ is required.

> Run all commands from project root.

## 🔧 Install

```bash
npm install
```

## 🔐 ENV variables

Project token and api url is passed by ENV variables. Create `.env`
file from example and update your project token.

```bash
cp .env.example .env
```

To obtain project token create new [Localazy project](https://localazy.com/my/dashboard) and go
to [Project settings > Developer Console > Access Tokens](https://localazy.com/console/tokens).

## 📋 List of examples

###### [Import JSON](import-json.mjs)

```bash
node examples/import-json.mjs
```

###### [Create screenshot](create-screenshot.mjs)

```bash
node examples/create-screenshot.mjs
```
