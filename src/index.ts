import type { ESLint } from 'eslint';
import { version } from '../package.json';
import noHttpUrl from './rules/no-http-url';
import requireCommentOnUseEffect from './rules/require-comment-on-useEffect';

const plugin = {
	meta: {
		name: 'ryoppippi',
		version,
	},
	rules: {
		'no-http-url': noHttpUrl,
		'require-comment-on-useEffect': requireCommentOnUseEffect,
	},
} as const satisfies ESLint.Plugin;

export default plugin;

type RuleDefinitions = typeof plugin['rules'];
