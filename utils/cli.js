const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	name: {
		type: `string`,
		alias: 'n',
		desc: 'Your Name that will be put on the License and in the author seciton of package.json'
	}
};

const commands = {
	help: { desc: `Print help info` },
	gen: { decs: 'Generate Starter Project Files' }
};

const helpText = meowHelp({
	name: `nac`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
