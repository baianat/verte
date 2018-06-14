const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { promisify } = require('util');
const { rollup } = require('rollup');
const { paths, configs, utils } = require('./config');
const mkdirp = promisify(mkdirpNode);

async function buildScripts (build) {
  await mkdirp(paths.dist);
  const bundleName = build.output.file.replace(paths.dist, '');
  console.log(chalk.cyan(`📦  Generating ${bundleName}...`));

  const bundle = await rollup(build.input);
  await bundle.write(build.output);

  console.log(chalk.green(`👍  ${bundleName} ${utils.stats({ path: build.output.file })}`));
}

Object.keys(configs).forEach(key => {
  buildScripts(configs[key]);
});

module.exports = { buildScripts };
