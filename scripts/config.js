const path = require('path');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue').default;
const resolve = require('rollup-plugin-node-resolve');
const css = require('rollup-plugin-css-only');
const buble = require('rollup-plugin-buble');
const { uglify } = require('rollup-plugin-uglify');

const { version } = require('../package.json');
const plugins = [
  replace({ __VERSION__: version }),
  css({ output: 'dist/verte.css' }),
  vue({ css: false }), // don't want css
  resolve(),
  buble()
];

module.exports = {
  banner:
    `/**
    * v${version}
    * (c) ${new Date().getFullYear()} Baianat
    * @license MIT
    */`,
  paths: {
    input: path.join(__dirname, '../src/verte.js'),
    src: path.join(__dirname, '../src/'),
    dist: path.join(__dirname, '../dist/')
  },
  builds: {
    umd: {
      output: 'verte.js',
      format: 'umd',
      plugins
    },
    umdMin: {
      output: 'verte.min.js',
      format: 'umd',
      plugins: plugins.concat([uglify()])
    },
    cjs: {
      output: 'verte.common.js',
      format: 'cjs',
      plugins
    },
    esm: {
      output: 'verte.esm.js',
      format: 'es',
      plugins
    }
  }
};
