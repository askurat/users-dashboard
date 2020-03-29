# Users Dashboard

Check out the demo: [users-dashboard](https://users-dashboard.skur.at/)

p.s. The theme is picked based on system preferences but can be changed.

## Installation

```bash
npm install
```

## Trying it out

```bash
npm run schema
npm run types
npm start
```

## Scripts

### npm run schema

Executing `npm run schema` in terminal will run the following command

```bash
apollo client:download-schema --endpoint=https://uyx9x.sse.codesandbox.io ./src/schema.json
```

It will download a remote schema and save it as `schema.json` inside `./src/` directory.

To see detailed explanation of what each flag does - please refer to official documentation on [apollo client:download](https://github.com/apollographql/apollo-tooling#apollo-clientdownload-schema-output)

### npm run types

Executing `npm run types` in terminal will run the following command

```bash
apollo client:codegen ./src/__generated__/types.ts --outputFlat --includes=./src/**/queries.ts --addTypename --localSchemaFile=./src/schema.json --target=typescript
```

It will generate types based on `./src/schema.json` and place them in `./src/__generated__/types.ts`.

To see detailed explanation of what each flag does - please refer to official documentation on [apollo client:codegen](https://github.com/apollographql/apollo-tooling#apollo-clientcodegen-output)
