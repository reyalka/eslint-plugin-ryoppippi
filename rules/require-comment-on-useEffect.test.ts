import rule, { RULE_NAME } from "./require-comment-on-useEffect.ts";
import { run } from "./_test.ts";

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
}, []);
`,
];

run({
  name: RULE_NAME,
  rule,
  valid,
  invalid: invalids.map((i) => ({
    code: i,
    output: i,
    errors: [{ messageId: "requireCommentOnUseEffect" }],
  })),
});
