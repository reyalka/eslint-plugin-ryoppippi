import { defineBuildConfig } from 'unbuild';
import UnpluginMacros from 'unplugin-macros/rollup';

export default defineBuildConfig({
	entries: [
		'src/index',
	],
	clean: true,
	declaration: true,
	rollup: {
		inlineDependencies: true,
	},
	hooks: {
		'rollup:options': (_, options) => {
			options.plugins.unshift(UnpluginMacros());
		},
	},
});
