# eslint-plugin-ryoppippi

[Rules List](./src/rules)

## Install

### npm

```sh
npm install --save-dev @ryoppippi/eslint-plugin
```

`eslint.config.js`

```ts
import ryoppippi from '@ryoppippi/eslint-plugin';

export default [
	...ryoppippi.configs['flat/recommended']
];
```

### JSR

```sh
npx jsr install @ryoppippi/eslint-plugin
```

`eslint.config.js`

```ts
import ryoppippi from '@ryoppippi/eslint-plugin';

export default [
	...ryoppippi.configs['flat/recommended']
];
```
