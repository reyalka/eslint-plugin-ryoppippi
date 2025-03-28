import { run } from './_test';
import rule, { RULE_NAME } from './require-comment-on-useEffect';

const valid = [
	`
// display log after rendering
useEffect(() => {
  console.log('Hello, useEffect!');
}, []);
`,
];

const invalids = [
	`
useEffect(() => {
  console.log('Hello, useEffect!');
}, []);`,
];

await run({
	name: RULE_NAME,
	rule,
	valid,
	invalid: invalids.map(i => ({
		code: i,
		output: null,
		errors: [{ messageId: 'requireCommentOnUseEffect' }],
	})),
});
