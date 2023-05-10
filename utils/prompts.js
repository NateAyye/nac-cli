const projectChoices = [' Vanilla', ' React', ' Node', ' NPM'];

const licenseTypes = {
	MIT: 'mit',
	'Apache-2.0': 'apache-2.0',
	'AGPL-3.0': 'agpl-3.0',
	'BSD-2-Clause': 'bsd-2-clause',
	'BSD-3-Clause': 'bsd-3-clause',
	'BSL-1.0': 'bsl-1.0',
	'CC0-1.0': 'cc0-1.0',
	'EPL-2.0': 'epl-2.0',
	'GPL-2.0': 'gpl-2.0',
	'GPL-3.0': 'gpl-3.0',
	'LGPL-2.1': 'lgpl-2.1',
	'MPL-2.0': 'mpl-2.0',
	Unlicense: 'unlicense'
};

const languageChoices = ['JavaScript', 'TypeScript'];

const licensePrompt = {
	type: 'list',
	name: 'license',
	message: 'Which LICENSE would you like for this project?',
	choices: Object.keys(licenseTypes),
	default: 0
};

const jsOrTsPrompt = {
	type: 'list',
	name: 'language',
	message: 'Which Language do you want this project in?',
	choices: languageChoices,
	default: languageChoices[1]
};

const isVitePrompt = {
	type: 'confirm',
	name: 'isVite',
	message: 'Use Vite for this project?',
	default: true
};

const basePrompts = [
	{
		type: 'list',
		name: 'projectType',
		message: 'What kind of project are we starting today?',
		choices: projectChoices,
		default: projectChoices[0]
	}
];

const esLintPrompt = {
	type: 'confirm',
	name: 'useEsLint',
	message: 'Use EsLint in this Project?',
	default: true
};

const isJqueryPrompt = {
	type: 'confirm',
	name: 'isJquery',
	message: 'Use Jquery in this project?',
	default: true
};

/* 
	Vanilla Prompts
		Is it JavaScript or TypeScript
*/
const vanillaPrompts = [jsOrTsPrompt, isVitePrompt, isJqueryPrompt, licensePrompt];

const reactPrompts = [jsOrTsPrompt, isVitePrompt, licensePrompt];

const npmPackagePrompts = [jsOrTsPrompt];

const nodePrompts = [];

module.exports = {
	vanillaPrompts,
	reactPrompts,
	npmPackagePrompts,
	nodePrompts,
	licenseTypes,
	languageChoices,
	basePrompts,
	isVitePrompt,
	jsOrTsPrompt,
	projectChoices
};
