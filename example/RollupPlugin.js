const fs = require('fs');
const path = require('path');
const VirtualModulesPlugin = require('webpack-virtual-modules');

const rollup = require('../node_modules/rollup');
const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');

class Watcher {

  constructor(watchPath, callback) {

    this.totalRequested = 0;
    this.callback = () => {
      console.log('callback');
      callback();
    }

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
    setTimeout(this.timeoutExpired, 1000);
  }
}

function watch(watchPath, callback) {
  new Watcher(watchPath, callback);
}

//let done = 0;

function rollup1(options) {
  return new Promise((resolve, reject) => {
    rollup.rollup(options).then(value => resolve(value), err => reject(err)).catch(err => reject(err));
  })
}

async function buildWithRollup() {
  console.log('buildWithRollup');

  //done++;
  //if (done > 2) return null;

  process.chdir('../');
  let chunks = null;

  try {
    const configPath = path.resolve(__dirname, '../rollup.config.js');
    const { options } = await loadConfigFile(configPath, { format: 'es' });
    const [{ output: [outputOptions], ...inputOptions }] = options;

    let bundle;
    //try{
      bundle = await rollup1({ ...inputOptions });
    //} catch (err) {
      //console.log(err);
    //}

    //console.log(bundle);



    const { output } = await bundle.generate(outputOptions);

    // const watcher = rollup.watch(options);
    // watcher.on('event', event => {
    //   console.log(event);
    // });

    chunks = output.filter(module => module.type === 'chunk');

  } catch (error) {
    throw error;
  } finally {
    process.chdir('example');
  }

  return chunks;
}

module.exports = class RollupPlugin {

  apply(compiler) {

    const virtualModulesPlugin = new VirtualModulesPlugin({});
    virtualModulesPlugin.apply(compiler);

    let output = null;
    let error = null;

    async function writeChunks() {
      try {
        output = await buildWithRollup();
        error = null;
      } catch (err) {
        error = err;
      }
      if (output !== null) for (const chunk of output) virtualModulesPlugin.writeModule('./node_modules/@webmd/' + chunk.fileName, chunk['code']);
    }

    compiler.hooks.beforeCompile.tapAsync('RollupPlugin', async function(params, callback) {
      if (output === null) await writeChunks();
      callback();
    });

    compiler.hooks.compilation.tap('RollupPlugin', function(compilation) {
      if (error !== null) compilation.errors.push(error.message);
    });

    // setTimeout(async () => {
    //   try {
    //     await buildWithRollup();
    //   } catch (err) {
    //     console.log(err.message)
    //   }
    // }, 7000);

    //setTimeout(writeChunks, 7000);
    //setTimeout(writeChunks, 14000);

    watch('../src', writeChunks);
  }
}
