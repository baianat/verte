const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { rollup } = require('rollup');
const { paths, inputOptions, banner } = require('./config');

// const isProduction = process.env.MODE === 'production';

async function buildScripts (format) {
  console.log(chalk.cyan(`📦  Generating ${format} builds...`));

  // get the rollup bundle.
  const bundle = await rollup({
    input: paths[format],
    ...inputOptions
  });

  // pass the desired output config
  const { code } = await bundle.generate({
    format: format,
    name: 'Verte',
    banner: banner
  });

  let filePath = path.join(paths.dist, 'verte.js');

  fs.writeFileSync(filePath, code);
  console.log(chalk.green('👍  verte.js'));
}

buildScripts('es');

module.exports = { buildScripts };
