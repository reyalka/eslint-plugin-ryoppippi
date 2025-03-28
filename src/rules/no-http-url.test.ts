import { run } from './_test';
import rule, { RULE_NAME } from './no-http-url';

const valid = [
	`'https'`,
	`'http'`,
	`'//github.com'`,
	`'https://github.com'`,
	'`https://github.com`',
	`"https://github.com"`,
	`'&url=https://github.com'`,
	`'http://localhost'`,
	`'http://localhost:8080'`,
	`'http://127.0.0.1'`,
	`'http://127.0.0.1:30'`,
	'`http://localhost`',
	`"http://localhost"`,
	'`\nhttp://localhost\n`',
	'`my profile url is https://example.com/ryoppippi`',
	// Test with custom allowedOrigins
	{
		code: `'http://custom.com'`,
		options: [{ allowedOrigins: ['custom.com'] }],
	},
];

const invalids = [
	[
		`'http://github.com'`,
		`'https://github.com'`,
	],
	[
		`"http://github.com"`,
		`"https://github.com"`,
	],
	[
		`"http://github.com http://ryoppippi.com"`,
		`"https://github.com https://ryoppippi.com"`,
	],
	[
		'`http://github.com`',
		'`https://github.com`',
	],
	[
		'`\nhttp://github.com/ryoppippi\n`',
		'`\nhttps://github.com/ryoppippi\n`',
	],
	[
		'`http://example.com/ryoppippi http://example.com/ryoppippi-2 https://example.com/ryoppippi`',
		'`https://example.com/ryoppippi https://example.com/ryoppippi-2 https://example.com/ryoppippi`',
	],
	[
		'`my profile url is http://example.com/ryoppippi`',
		'`my profile url is https://example.com/ryoppippi`',
	],
	[
		// eslint-disable-next-line no-template-curly-in-string
		'`http://github.com/ryoppippi/${path}`',
		// eslint-disable-next-line no-template-curly-in-string
		'`https://github.com/ryoppippi/${path}`',
	],
	[
		// eslint-disable-next-line no-template-curly-in-string
		'`http://github.com/ryoppippi/${path}/${path2}`',
		// eslint-disable-next-line no-template-curly-in-string
		'`https://github.com/ryoppippi/${path}/${path2}`',
	],
	[
		`'&url=http://github.com'`,
		`'&url=https://github.com'`,
	],
	// Test with custom allowedOrigins
	[
		`'http://notallowed.com'`,
		`'https://notallowed.com'`,
		[{ allowedOrigins: ['custom.com'] }],
	],
];

await run({
	name: RULE_NAME,
	rule,
	valid,
	invalid: invalids.map(i => ({
		code: i[0],
		output: i[1],
		options: i[2],
		errors: [{ messageId: 'httpNotAllowed' }],
	})),
});
