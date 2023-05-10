const { projectChoices } = require('../../prompts');

module.exports = function buildEsLintFile(answers, projectType) {
	let baseEsLint = {};

	switch (projectType) {
		case projectChoices[0]: // Vanilla
			break;
		case projectChoices[1]: // React
			break;
		case projectChoices[2]: // Node
			break;
		case projectChoices[3]: // NPM
			if (answers.language === 'TypeScript') {
				baseEsLint = {
					root: true,
					parser: '@typescript-eslint/parser',
					parserOptions: {
						ecmaVersion: 2020,
						sourceType: 'module'
					},
					settings: {
						'import/resolver': {
							node: {
								paths: ["'src'"],
								extensions: ['.js', '.ts']
							}
						}
					},
					env: {
						browser: true,
						amd: true,
						node: true
					},
					extends: [
						'eslint:recommended',
						'plugin:@typescript-eslint/recommended',
						'plugin:prettier/recommended' // Make sure this is always the last element in the array.
					],
					plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
					rules: {
						'prettier/prettier': [
							'error',
							{},
							{
								usePrettierrc: true
							}
						],
						'@typescript-eslint/explicit-function-return-type': 'off',
						'simple-import-sort/imports': 'error',
						'simple-import-sort/exports': 'error'
					}
				};
			} else {
				baseEsLint = {
					root: true,
					parserOptions: {
						ecmaVersion: 2020,
						sourceType: 'module'
					},
					settings: {
						'import/resolver': {
							node: {
								paths: ["'src'"],
								extensions: ['.js', '.ts']
							}
						}
					},
					env: {
						browser: true,
						amd: true,
						node: true
					},
					extends: [
						'eslint:recommended',
						'plugin:prettier/recommended' // Make sure this is always the last element in the array.
					],
					plugins: [ 'simple-import-sort', 'prettier'],
					rules: {
						'prettier/prettier': [
							'error',
							{},
							{
								usePrettierrc: true
							}
						],
						'simple-import-sort/imports': 'error',
						'simple-import-sort/exports': 'error'
					}
				};
			}
			break;

		default:
			break;
	}

	return JSON.stringify(baseEsLint, null, ' ');
};
