const fs = require('fs');
const path = require('path');

class Watcher {

  constructor(_path, callback) {

    this.changes = 0;
    this.callback = callback;

    this.emitEvent = this.emitEvent.bind(this);
    this.waitForAllChanges = this.waitForAllChanges.bind(this);

    fs.watch(path.resolve(__dirname, _path), { recursive: true }, this.waitForAllChanges);
  }

  emitEvent() {
    this.changes--;
    if (this.changes === 0) this.callback();
  }

  waitForAllChanges() {
    this.changes++;
    setTimeout(this.emitEvent, 100);
  }
}

const VirtualModulesPlugin = require('webpack-virtual-modules');

async function buildWithRollup() {

  process.chdir('../');

  const rollup = require('../node_modules/rollup');
  const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');
  const { options: [{ output: [outputOptions], ...inputOptions }] } = await loadConfigFile(path.resolve(__dirname, '../rollup.config.js'));

  const bundle = await rollup.rollup(inputOptions);

  const { output } = await bundle.generate(outputOptions);

  const _output = output.filter(o => o.type === 'chunk');

  process.chdir('example');

  return _output;
}

export default class RollupPlugin {

  apply(compiler) {

    const virtulaModulesPlugin = new VirtualModulesPlugin();
    virtulaModulesPlugin.apply(compiler);

    const _this = {
      output: null,
      requireRewriteVirtualFiles: false
    };

    async function rebuild() {
      _this.output = await buildWithRollup();

      _this.requireRewriteVirtualFiles = true;
      const chunk = _this.output[0];
      virtulaModulesPlugin.writeModule('./node_modules/@mdc/' + chunk.fileName, chunk['code'] || chunk['source']);
    }

    compiler.hooks.beforeCompile.tapAsync('RollupPlugin', async function (params, callback) {

      if (_this.output !== null) {
        callback();
        return;
      }
      console.log('beforeCompile');

      const output = await buildWithRollup();

      _this.output = output;

      for (const chunk of _this.output) {
        virtulaModulesPlugin.writeModule('./node_modules/@mdc/' + chunk.fileName, chunk['code'] || chunk['source']);
      }

      callback();
    });

    new Watcher('../src', function() {
      rebuild();
    });

    compiler.hooks.compilation.tap('RollupPlugin', function (compilation) {

      if (_this.requireRewriteVirtualFiles === false) {
        return;
      }

      console.log('compilation');

      for (const chunk of _this.output) {
        virtulaModulesPlugin.writeModule('./node_modules/@mdc/' + chunk.fileName, chunk['code'] || chunk['source']);
      }

    });

  }
}
