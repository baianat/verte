const path = require('path');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue').default;
const resolve = require('rollup-plugin-node-resolve');
const css = require('rollup-plugin-css-only');
const buble = require('rollup-plugin-buble');
const { uglify } = require('rollup-plugin-uglify');

const { version } = require('../package.json');

const common = {
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
      env: 'development'
    },
    umdMin: {
      output: 'verte.min.js',
      format: 'umd',
      env: 'production'
    },
    esm: {
      output: 'verte.esm.js',
      format: 'es'
    }
  }
};

function genConfig (options) {
  const config = {
    input: {
      input: options.input,
      plugins: [
        replace({ __VERSION__: version }),
        css({ output: 'dist/verte.css' }),
        vue({ css: false }),
        resolve(),
        buble()
      ]
    },
    output: {
      banner: common.banner,
      format: options.format,
      name: options.name
    }
  };

  if (options.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(options.env)
    }));
  }

  if (options.env === 'production') {
    config.input.plugins.push(uglify());
  }

  return config;
};

const configs = Object.keys(common.builds).reduce((prev, key) => {
  prev[key] = genConfig(common.builds[key]);

  return prev;
}, {});

module.exports = {
  configs,
  utils: common.utils,
  uglifyOptions: common.uglifyOptions,
  paths: common.paths
};
