const path = require('path');
const replace = require('rollup-plugin-replace');
const vuePlugin = require('rollup-plugin-vue').default;
const resolve = require('rollup-plugin-node-resolve');
const { version } = require('../package.json');

module.exports = {
  banner:
    `/**
    * v${version}
    * (c) ${new Date().getFullYear()} Baianat
    * @license MIT
    */`,
  paths: {
    es: path.join(__dirname, '../src/verte.js'),
    umd: path.join(__dirname, '../src/verte.js'),
    src: path.join(__dirname, '../src/'),
    dist: path.join(__dirname, '../dist/')
  },
  inputOptions: {
    plugins: [
      replace({ __VERSION__: version }),
      vuePlugin(),
      resolve()
    ]
  }
};
