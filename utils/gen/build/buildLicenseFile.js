const { licenseTypes } = require('../../prompts');
const { Octokit } = require('octokit');

async function buildLicenseFile(license, flags, projectName) {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN
	});

	const response = await octokit.request(`GET /licenses/${licenseTypes[license]}`);
	let licenseBody = response.data.body?.replace(/\[year\]/g, new Date().getFullYear())?.replace('[fullname]', flags.name ?? 'Nathan A Cuevas');

	switch (licenseTypes[license]) {
		case licenseTypes[0]: // MIT
			licenseBody?.replace(/\[year\]/g, new Date().getFullYear())?.replace(/\[fullname\]/g, flags.name ?? 'Nathan A Cuevas');
			break;
		case licenseTypes[1]: // Apache-2.0
			licenseBody?.replace(/\[yyyy\]/g, new Date().getFullYear())?.replace(/\[name of copyright owner\]/g, flags.name ?? 'Nathan A Cuevas');
			break;
		case licenseTypes[2]: // AGPL-3.0
			licenseBody
				?.replace(/<year>/g, new Date().getFullYear())
				?.replace(/<name of author>/g, flags.name ?? 'Nathan A Cuevas')
				?.replace(
					/<one line to give the program's name and a brief idea of what it does.>/g,
					'Standard Project that can be referenced in the README file.'
				);
			break;
		case licenseTypes[3]: // BSD-2-Clause
			licenseBody?.replace(/\[yyyy\]/g, new Date().getFullYear())?.replace(/\[name of copyright owner\]/g, flags.name ?? 'Nathan A Cuevas');
			break;

		case licenseTypes[7]: // EPL-2.0
			licenseBody?.replace(/\{name license(s),version(s), and exceptions or additional permissions here\}/g, 'none');
			break;
		case licenseTypes[8]: // GPL-2.0
			licenseBody
				?.replace(/<year>/g, new Date().getFullYear())
				?.replace(/<name of author>/g, flags.name ?? 'Nathan A Cuevas')
				?.replace(
					/<one line to give the program's name and a brief idea of what it does.>/g,
					'Standard Project that can be referenced in the README file.'
				);
			break;

		case licenseTypes[9]: // GPL-3.0
			licenseBody
				?.replace(/<year>/g, new Date().getFullYear())
				?.replace(/<name of author>/g, flags.name ?? 'Nathan A Cuevas')
				?.replace(
					/<one line to give the program's name and a brief idea of what it does.>/g,
					'Standard Project that can be referenced in the README file.'
				)
				?.replace(/<program>/g, projectName ?? process.cwd().split('\\').slice(-1));
			break;
		case licenseTypes[10]: // LGPL-2.1
			licenseBody
				?.replace(/<year>/g, new Date().getFullYear())
				?.replace(/<name of author>/g, flags.name ?? 'Nathan A Cuevas')
				?.replace(
					/<one line to give the program's name and a brief idea of what it does.>/g,
					'Standard Project that can be referenced in the README file.'
				)
				?.replace(/<program>/g, projectName ?? process.cwd().split('\\').slice(-1));
			break;
		default:
			break;
	}

	return licenseBody;
}

module.exports = buildLicenseFile;
