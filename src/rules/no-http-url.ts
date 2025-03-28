import type { Rule } from 'eslint';
import { docUrl } from '../utils' with {type: 'macro'};

export const RULE_NAME = `no-http-url`;
export const MESSAGE_ID = `httpNotAllowed`;

const rule = ({
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow http url',
			url: docUrl('no-http-url'),
		},
		fixable: 'code',
		schema: [],
		messages: {
			[MESSAGE_ID]: 'HTTP is not safe enough. use HTTPS.',
		},
	},
	create: (context) => {
		/**
		 * Check whether the URL is HTTP and fix it to HTTPS.
		 */
		const checkHttpUrl = (node: Rule.Node, value: string, raw: string | null | undefined): void => {
			const urlRegexp = /http:\/\//i;
			// eslint-disable-next-line regexp/no-unused-capturing-group
			const localRegexp = /(localhost|127\.0\.0\.1)/i;

			if (
				value != null
				&& typeof value === 'string'
				// eslint-disable-next-line ts/strict-boolean-expressions
				&& value.match(urlRegexp)
				// eslint-disable-next-line ts/strict-boolean-expressions
				&& !value.match(localRegexp)
			) {
				context.report({
					node,
					messageId: MESSAGE_ID,
					fix(fixer) {
						if (raw == null) {
							return null;
						}
						const result = raw.replace(urlRegexp, 'https://');
						return fixer.replaceText(node, result);
					},
				});
			}
		};

		return {
			Literal: (node) => {
				const token = context.sourceCode.getFirstToken(node);

				if (token != null && token.type === 'String' && typeof node.value === 'string') {
					checkHttpUrl(node, node.value, node.raw);
				}
			},
			TemplateLiteral: (node) => {
				const quasi = node.quasis[0];
				const value = quasi.value.cooked;
				const raw = `\`${quasi.value.raw}\``;

				if (value == null) {
					return;
				}

				checkHttpUrl(node, value, raw);
			},
		};
	},
}) as const satisfies Rule.RuleModule;

export default rule;
