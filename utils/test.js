const { Octokit } = require('octokit');
const path = require('path');
const fsPromises = require('fs').promises;
const { licenseTypes } = require('./prompts');

const licenseKeys = Object.keys(licenseTypes);

async function getLicenses() {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN
	});

	const data = await octokit.request(`GET /licenses/${licenseKeys[0]}`);

	console.log(data);
	fsPromises.writeFile(path.join(__dirname, '..', 'templates', 'licenses', `_${data.data.key}`), data.data.body);

	// licenses.forEach(async (license) => {
	// 	const licenseData = await octokit.request(`GET /licenses/{license}`, {
	// 		license: license.key
	// 	});
	// 	console.log(licenseData);
	// });
}

module.exports = getLicenses;
