import { existsSync } from 'node:fs';
import * as ufo from 'ufo';
import { version } from '../package.json';

const BASE_URL = `https://github.com/ryoppippi/eslint-plugin-ryoppippi/tree/v${version}/src/rules`;

export function docUrl(ruleName: string): string {
	const mdFilePath = ufo.joinURL(import.meta.dirname, 'rules', `${ruleName}.md`);
	if (existsSync(mdFilePath)) {
		return ufo.joinURL(BASE_URL, `${ruleName}.md`);
	}
	return ufo.joinURL(BASE_URL, `${ruleName}.test.ts`);
}
