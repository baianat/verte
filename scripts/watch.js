const { paths } = require('./config');
const { buildScripts } = require('./build');
const bs = require('browser-sync').create();

bs.init({
  server: './',
  files: [
    './index.html', {
      match: paths.src,
      fn (event, file) {
        buildScripts('es');
        bs.reload();
      }
    }
  ]
});
