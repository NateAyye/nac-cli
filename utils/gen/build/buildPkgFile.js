const { projectChoices } = require('../../prompts');

function buildPackageFile(projectName, projectType, answers) {
	const isTypescript = answers.language === 'TypeScript';

	const packageData = {
		name: projectName,
		version: '0.0.1',
		type: 'module',
		description: '* As a developer, I want to be able to keep track of dependencies using `npm`.',
		scripts: {
			test: 'echo "Error: no test specified" && exit 1'
		},
		keywords: [],
		author: '',
		license: answers.license,
		devDependencies: {
			prettier: '^2.8.8',
			eslint: '^8.39.0',
			'eslint-plugin-prettier': '^4.0.0',
			'eslint-config-pretter': '^8.5.0',
			'eslint-plugin-import': '^2.26.0',
			'eslint-plugin-simple-import-sort': '^7.0.0'
		}
	};

	if (answers.language === 'TypeScript') {
		packageData.devDependencies = {};
		packageData.devDependencies['@typescript-eslint/eslint-plugin'] = '^5.59.0';
		packageData.devDependencies['@typescript-eslint/parser'] = '^5.27.0';
		packageData.devDependencies.tsup = '^6.7.0';
		packageData.devDependencies.typescript = '^5.0.0';
	}

	switch (projectType) {
		case projectChoices[0]: // Vanilla
			packageData.devDependencies = {};

			if (answers.isVite) {
				packageData.scripts.dev = 'vite';
				packageData.scripts.build = `${isTypescript ? 'tsc && ' : ''}vite build`;
				packageData.scripts.preview = 'vite preview';
				packageData.devDependencies.vite = '^4.3.2';
			}
			break;
		case projectChoices[1]: // React
			packageData.scripts = {
				dev: 'vite',
				build: `${isTypescript ? 'tsc && ' : ''}vite build`,
				lint: `eslint src --ext ${isTypescript ? 't' : 'j'}s,${isTypescript ? 't' : 'j'}sx --report-unused-disable-directives --max-warnings 0`,
				preview: 'vite preview'
			};
			packageData.dependencies = {
				react: '^18.2.0',
				'react-dom': '^18.2.0'
			};
			packageData.devDependencies = {
				'@types/css': '^0.0.33',
				'@types/react': '^18.0.28',
				'@types/react-dom': '^18.0.11',
				'eslint-plugin-react': '^7.32.2',
				'eslint-plugin-react-hooks': '^4.6.0',
				'eslint-plugin-react-refresh': '^0.3.4'
			};
			if (answers.isVite) {
				packageData.devDependencies.vite = '^4.3.2';
				packageData.devDependencies['@vitejs/plugin-react-swc'] = '^3.0.0';
			}
			break;
		case projectChoices[2]: // Node
			packageData.devDependencies = {};
			packageData.type = 'commonjs';
			break;
		case projectChoices[3]: // NPM
			packageData.devDependencies = {};
			break;

		default:
			break;
	}

	return JSON.stringify(packageData, null, ' ');
}

module.exports = buildPackageFile;
