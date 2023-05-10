const fse = require('fs-extra');
const path = require('path');
const alert = require('cli-alerts');

function generateNpmFiles(answers, projectName, flags) {
	fse
		.copy(
			path.join(__dirname, '..', '..', 'templates', `npm-package${answers.language === 'TypeScript' ? '-ts' : ''}`),
			projectName ? `./${projectName}` : './'
		)
		.then(() => {
			const title = chalk.bgHex('#2c74de');
			const dimBg = chalk.bgHex('#7777');
			alert({ type: `success`, msg: `Everything finished!`, name: `DONE` });
			console.log();
			console.log(title(chalk.bold.black(' First Steps: ')));
			console.log();
			console.log(chalk.bold(dimBg.whiteBright(' npm i ')));
			console.log();
			console.log(chalk.bold(dimBg(' npm run build:dev ')));
		});
}

module.exports = generateNpmFiles;
