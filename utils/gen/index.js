const inquirer = require('inquirer');
const { vanillaPrompts, nodePrompts, projectChoices, reactPrompts, npmPackagePrompts, basePrompts } = require('../prompts');
const generateStaticSiteFiles = require('./static');
const generateReactFiles = require('./react');
const generateNodeFiles = require('./node');
const generateNpmFiles = require('./npm');

async function generate(input, flags) {
	const filteredInputs = input.filter((com) => com !== 'gen');
	let projectName = filteredInputs.length ? filteredInputs[0] : '';

	if (!projectName) {
		const answers = await inquirer.prompt([{ type: 'input', name: 'projectName', message: 'Name of the Project?', default: 'project-name' }]);
		projectName = answers.projectName;
	}

	inquirer.prompt(basePrompts).then((answers) => {
		switch (answers.projectType) {
			case projectChoices[0]: // Vanilla
				inquirer.prompt(vanillaPrompts).then((answers) => generateStaticSiteFiles(answers, projectName, projectChoices[0], flags));
				break;
			case projectChoices[1]: // React
				inquirer.prompt(reactPrompts).then((answers) => generateReactFiles(answers, projectName, flags));
				break;
			case projectChoices[2]: // Node
				inquirer.prompt(nodePrompts).then((answers) => generateNodeFiles(answers, projectName, flags));
				break;
			case projectChoices[3]: // NPM
				inquirer.prompt(npmPackagePrompts).then((answers) => generateNpmFiles(answers, projectName, flags));
				break;
			default:
				break;
		}
	});
}

module.exports = generate;
