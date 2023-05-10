const { projectChoices } = require('../../prompts');

module.exports = function buildPrettierRc(answers, projectType) {
	const basePrettierRc = {
		semi: true,
		trailingComma: 'all',
		singleQuote: true,
		printWidth: 150,
		tabWidth: 2,
		endOfLine: 'auto'
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

	return JSON.stringify(basePrettierRc, null, ' ');
};
