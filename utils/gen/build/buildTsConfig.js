const { projectChoices } = require('../../prompts');

function buildTsConfigFile(projectType) {
	const tsConfig = {
		compilerOptions: {
			target: 'ES2020',
			strict: true,
			resolveJsonModule: true,
			noUnusedLocals: true,
			noUnusedParameters: true
		},
		include: ['src']
	};
	switch (projectType) {
		case projectChoices[0]: // Vanilla
			break;
		case projectChoices[1]: // React
			break;
		case projectChoices[2]: // Node
			break;
		case projectChoices[3]: // NPM
			break;

		default:
			break;
	}

	return JSON.stringify(tsConfig);
}
