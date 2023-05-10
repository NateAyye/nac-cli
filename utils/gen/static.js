const fse = require('fs-extra');
const path = require('path');
const alert = require('cli-alerts');
const buildPackageFile = require('./build/buildPkgFile');
const chalk = require('chalk');
const buildLicenseFile = require('./build/buildLicenseFile');
const ora = require('ora');
const init = require('../init');

const spinner = ora({ text: '' });

async function generateStaticSiteFiles(answers, projectName, projectType, flags) {
	init({ clear: true });

	console.log(`${chalk.bold.bgGreenBright.gray(' Building ')}: ${projectName ?? process.cwd().split('\\').slice(-1)}`);
	console.log('');

	spinner.start('Copying Files Over');
	try {
		await fse.copy(
			path.join(__dirname, '..', '..', 'templates', `vanilla${answers.language === 'TypeScript' ? '-ts' : ''}`),
			projectName ? `./${projectName}` : './'
		);
	} catch (err) {
		spinner.fail('Error Copying base Files!');
		alert({ type: 'error', message: err.message });
	} finally {
		if (answers.isVite && answers.language === 'TypeScript') {
			fse.writeFile(projectName ? `./${projectName}/src/vite-env.d.ts` : './src/vite-env.d.ts', '/// <reference types="vite/client" />');
		}
	}

	spinner.succeed('Building Liscense file...');

	try {
		await fse.writeFile(projectName ? `./${projectName}/LICENSE` : './LICENSE', await buildLicenseFile(answers.license, flags, projectName));
	} catch (err) {
		spinner.fail('Failed To build License');
		process.exitCode = 1;
	}

	spinner.succeed('Building README file...');

	try {
		fse.readFile(path.join(__dirname, '..', '..', 'templates', '_README.txt'), 'utf-8', (err, data) => {
			if (err) throw err;
			const readMe = data.replace('<Your-Project-Title>', projectName ?? process.cwd().split('\\').slice(-1));
			fse.writeFile(projectName ? `./${projectName}/README.md` : './README.md', readMe);
		});
	} catch (err) {
		spinner.fail('Failed To build README');
		process.exitCode = 1;
	}

	spinner.succeed('Building package.json file...');

	try {
		await fse.writeFile(projectName ? `./${projectName}/package.json` : './package.json', buildPackageFile(projectName, projectType, answers));
	} catch (err) {
		console.log(err);
		spinner.fail('Failed To build package.json');
		process.exitCode = 1;
	}

	spinner.stop();

	alert({ type: `success`, msg: `Everything finished!`, name: `DONE` });
}

module.exports = generateStaticSiteFiles;
