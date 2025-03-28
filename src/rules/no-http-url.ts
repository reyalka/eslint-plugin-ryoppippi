import type { Rule } from 'eslint';
import { docUrl } from '../utils' with {type: 'macro'};

export const RULE_NAME = `no-http-url`;
export const MESSAGE_ID = `httpNotAllowed`;

// Top-level regex definitions
const URL_REGEXP = /http:\/\//gi;
const LOCAL_REGEXP = /localhost|127\.0\.0\.1/gi;

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
			if (
				value != null
				&& typeof value === 'string'
				// eslint-disable-next-line ts/strict-boolean-expressions
				&& value.match(URL_REGEXP)
				// eslint-disable-next-line ts/strict-boolean-expressions
				&& !value.match(LOCAL_REGEXP)
			) {
				context.report({
					node,
					messageId: MESSAGE_ID,
					fix(fixer) {
						if (raw == null) {
							return null;
						}
						const result = raw.replace(URL_REGEXP, 'https://');
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
				// Handle template literals correctly, keeping all quasi and expression parts
				const sourceCode = context.sourceCode;
				const fullText = sourceCode.getText(node);
				const value = node.quasis.map(q => q.value.cooked).join('');

				if (
					// eslint-disable-next-line ts/strict-boolean-expressions
					value.match(URL_REGEXP)
					// eslint-disable-next-line ts/strict-boolean-expressions
					&& !value.match(LOCAL_REGEXP)
				) {
					context.report({
						node,
						messageId: MESSAGE_ID,
						fix(fixer) {
							const newText = fullText.replace(URL_REGEXP, 'https://');
							return fixer.replaceText(node, newText);
						},
					});
				}
			},
		};
	},
}) as const satisfies Rule.RuleModule;

export default rule;
