const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { promisify } = require('util');
const { rollup } = require('rollup');
const { paths, builds, banner } = require('./config');
const mkdirp = promisify(mkdirpNode);


async function buildScripts (build) {
  await mkdirp(paths.dist);
  console.log(chalk.cyan(`📦  Generating ${build.output}...`));

  const inputOptions = {
    input: paths.input,
    plugins: build.plugins
  }

  const outputOptions = {
    file: path.join(paths.dist, build.output),
    format: build.format,
    name: 'Verte',
    banner: banner
  }

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);

  console.log(chalk.green(`👍  ${build.output}`));
}

Object.keys(builds).forEach(key => {
  buildScripts(builds[key]);
});

module.exports = { buildScripts };
