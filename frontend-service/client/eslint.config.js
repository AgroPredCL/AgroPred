import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		ignores: ['node_modules', 'dist'], // Añadir aquí las rutas a ignorar
		languageOptions: { globals: globals.browser },
		settings: {
			react: {
				version: 'detect', // Detectar automáticamente la versión de React
			},
		},
		rules: {
			semi: ['warn', 'always'],
			'no-unused-vars': ['warn'],
		},
	},
	pluginJs.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			'react/react-in-jsx-scope': 'off', // Desactivar la regla que requiere React en JSX
		},
	},
	prettierConfig,
];
