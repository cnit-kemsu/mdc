const fs = require('fs');
const path = require('path');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const rollup = require('../node_modules/rollup');
const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');

class Watcher {

  constructor(watchPath, callback) {

    this.totalRequested = 0;
    this.callback = callback;
    this.was = false;

    this.timeoutExpired = this.timeoutExpired.bind(this);
    this.addTimeout = this.addTimeout.bind(this);

    const _watchPath = path.resolve(__dirname, watchPath);
    fs.watch(_watchPath, { recursive: true, persistent: false }, this.addTimeout);
  }

  async timeoutExpired() {
    console.log('expired:', this.totalRequested);
    this.totalRequested--;
    try {
      if (this.totalRequested === 0) {
        if (!this.was) {
          await this.callback();
          console.log('callback');
        }
        this.was = true;
      }
    } catch (error) {
      console.log('111111111111');
    }
  }

  addTimeout() {
    if (this.was) return;
    console.log('timeout');
    this.totalRequested++;
    try {
      setTimeout(this.timeoutExpired, 2000);
    } catch (error) {
      console.log('2222222222222');
    }
    
  }
}

function watch(watchPath, callback) {
  new Watcher(watchPath, callback);
}

function ROLLUP(args) {
  console.log('ROLLUP!!!!!!!!!!!!!');
  return rollup.rollup(args);
}

async function buildWithRollup() {

  console.log('build with rollup');
  process.chdir('../');
  let chunks = null;

  // const rollup = require('../node_modules/rollup');
  // const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');

  try {
    const configPath = path.resolve(__dirname, '../rollup.config.js');
    const { options, warnings } = await loadConfigFile(configPath, { format: 'es' });
    const [{ output: [outputOptions], ...inputOptions }] = options;

    warnings.flush();

    const bundle = await ROLLUP({ ...inputOptions, cache: false });
    console.log(bundle);
    const { output } = await bundle.generate(outputOptions);
    chunks = output.filter(module => module.type === 'chunk');

  } catch (error) {

    process.chdir('example');
    throw error;
  }

  process.chdir('example');
  return chunks;
}

module.exports = class RollupPlugin {

  apply(compiler) {

    const virtualModulesPlugin = new VirtualModulesPlugin({});
    virtualModulesPlugin.apply(compiler);

    let output;
    let error = null;

    output = null;

    let writes = 0;

    async function writeChunks(flag = false) {
      console.log('write chunks');
      writes++;
        if (writes > 2) return;
      try {
        output = await buildWithRollup();
        error = null;
      } catch (_error) {
        error = _error;
      }
      if (flag === true && output !== null) for (const chunk of output) virtualModulesPlugin.writeModule('./node_modules/@webmd/' + chunk.fileName, chunk['code']);
    }

    compiler.hooks.beforeCompile.tapAsync('RollupPlugin', async function(params, callback) {
      console.log('beforeCompile');
      if (output === null) await writeChunks(true);
      callback();
    });

    compiler.hooks.compilation.tap('RollupPlugin', function(compilation) {
      if (error !== null) compilation.errors.push(error.message);
    });

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    try {
      watch('../src', async () => {
        output = null;
        virtualModulesPlugin.writeModule('./node_modules/@webmd/IconStore.js', '');
        //writeChunks();
      });
    } catch (error) {
      console.log('err3333333333333');
    }
  }
}
