import type { ESLint, Linter } from 'eslint';
import { version } from '../package.json';
import noHttpUrl from './rules/no-http-url';
import requireCommentOnUseEffect from './rules/require-comment-on-useEffect';

export type Plugin = {
	configs: {
		'recommended': ESLint.ConfigData;
		'flat/recommended': Array<Linter.Config>;
	};
} & ESLint.Plugin;

const plugin = {
	meta: {
		name: 'ryoppippi',
		version,
	},
	rules: {
		'no-http-url': noHttpUrl,
		'require-comment-on-useEffect': requireCommentOnUseEffect,
	},
	configs: {} as Plugin['configs'],
} as const satisfies Plugin;

Object.assign(plugin.configs, {
	'recommended': {
		plugins: ['ryoppippi'],
		rules: {
			'ryoppippi/no-http-url': 'error',
			'ryoppippi/require-comment-on-useEffect': 'error',
		},
	},
	'flat/recommended': [
		{
			name: 'ryoppippi/flat/recommended',
			plugins: {
				ryoppippi: plugin,
			},
			rules: {
				'ryoppippi/no-http-url': 'error',
				'ryoppippi/require-comment-on-useEffect': 'error',
			},
		},
	],
});

export default plugin;
