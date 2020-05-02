# Online swagger codegen
An online swagger client generator

This package generate from your swagger JSON file the desired client using `https://generator.swagger.io/api/gen/clients` 
endpoint. 

## Installation

```bash
yarn add --dev online-swagger-codegen
```

## Usage
Example:

```typescript
GenerateSDK({
        specURL: 'http://localhost:3000/swaggher.json',
        outPath: path.resolve(__dirname, '../generated'),
    });
```

Input parameters:
 - outPath - required - place to save zip file
 - client - optional, default: `typescript-node`
 - specURL - optional - the url to swagger json file
 - spec - optional - the swagger json object
 - specURL or spec should be provided

## Supported clients

- [X] Typescript node
- [x] Typescript angular
- [ ] ...
