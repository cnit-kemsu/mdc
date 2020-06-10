const fs = require('fs');
const path = require('path');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const rollup = require('../node_modules/rollup');
const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');

class Watcher {

  constructor(watchPath, callback) {

    this.totalRequested = 0;
    this.callback = callback;

    this.timeoutExpired = this.timeoutExpired.bind(this);
    this.addTimeout = this.addTimeout.bind(this);

    const _watchPath = path.resolve(__dirname, watchPath);
    fs.watch(_watchPath, { recursive: true }, this.addTimeout);
  }

  timeoutExpired() {
    this.totalRequested--;
    if (this.totalRequested === 0) this.callback();
  }

  addTimeout() {
    this.totalRequested++;
    setTimeout(this.timeoutExpired, 100);
  }
}

function watch(watchPath, callback) {
  new Watcher(watchPath, callback);
}

async function buildWithRollup() {

  process.chdir('../');
  
  const configPath = path.resolve(__dirname, '../rollup.config.js');
  const { options } = await loadConfigFile(configPath, { format: 'es' });
  const [{ output: [outputOptions], ...inputOptions }] = options;

  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  const chunks = output.filter(module => module.type === 'chunk');

  process.chdir('example');

  return chunks;
}

export default class RollupPlugin {

  apply(compiler) {

    const virtulaModulesPlugin = new VirtualModulesPlugin();
    virtulaModulesPlugin.apply(compiler);

    let output = null

    async function rebuild() {
      output = await buildWithRollup();
      for (const chunk of output) {
        virtulaModulesPlugin.writeModule('./node_modules/@mdc/' + chunk.fileName, chunk['code']);
      }
    }

    compiler.hooks.beforeCompile.tapAsync('RollupPlugin', async function (params, callback) {

      if (output === null) {
        output = await buildWithRollup();
        for (const chunk of output) {
          virtulaModulesPlugin.writeModule('./node_modules/@mdc/' + chunk.fileName, chunk['code'] || chunk['source']);
        }
      }

      callback();
    });

    watch('../src', rebuild);
  }
}
