import { run } from './_test.ts';
import rule, { RULE_NAME } from './no-http-url.ts';

const valid = [
	`'https'`,
	`'http'`,
	`'//github.com'`,
	`'https://github.com'`,
	`'&url=https://github.com'`,
	`'http://localhost'`,
	`'http://localhost:8080'`,
	`'http://127.0.0.1'`,
	`'http://127.0.0.1:30'`,
];

const invalids = [
	[
		`'http://github.com'`,
		`'https://github.com'`,
	],
	[
		`'&url=http://github.com'`,
		`'&url=https://github.com'`,
	],
];

run({
	name: RULE_NAME,
	rule,
	valid,
	invalid: invalids.map(i => ({
		code: i[0],
		output: i[1],
		errors: [{ messageId: 'httpNotAllowed' }],
	})),
});
