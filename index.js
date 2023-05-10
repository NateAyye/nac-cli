#!/usr/bin/env node

/**
 * nac-cli
 * Bootstrap and kind of Project with ease (Vanilla, React, Node, NPM)
 *
 * @author Nathan Cuevas <https://github.com/NateAyye>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const getLicenses = require('./utils/test');
const generate = require('./utils/gen');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });

	input.includes(`help`) && cli.showHelp(0);

	input.includes('gen') && generate(input, flags);

	// input.includes('test') && getLicenses();

	debug && log(flags);
})();
