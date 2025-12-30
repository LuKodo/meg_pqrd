import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig, loadEnv } from "@rsbuild/core";
const { publicVars } = loadEnv({ prefixes: ['VITE_'] });

export default defineConfig({
	resolve: {
		alias: {
			"@": "./src"
		},
	},
	plugins: [
		pluginReact(),
	],
	server: {
		port: 3075,
		base: '/',
	},
	html: {
		template: './index.html'
	},
	source: {
		entry: {
			index: './src/main.tsx'
		},
		define: publicVars
	},
});
