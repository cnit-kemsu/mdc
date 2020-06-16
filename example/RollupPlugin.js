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
    setTimeout(this.timeoutExpired, 100);
  }
}

function watch(watchPath, callback) {
  new Watcher(watchPath, callback);
}

process.on('uncaughtException', function(err) {
  if (err.plugin !== 'typescript') throw err;
  console.log('UNCAUGHT!!!!!!!!!!!!!');
  console.log(err);
});


const configPath = path.resolve(__dirname, '../rollup.config.js');

// async function buildWithRollup() {

//   process.chdir('../');
//   let chunks = null;

//   try {
//     const { options } = await loadConfigFile(configPath, { format: 'es' });
//     const [{ output: [outputOptions], ...inputOptions }] = options;

//     const bundle = await rollup.rollup({ ...inputOptions });
//     const { output } = await bundle.generate(outputOptions);

//     chunks = output.filter(module => module.type === 'chunk');

//   } catch (error) {
//     throw error;
//   } finally {
//     process.chdir('example');
//   }

//   return chunks;
// }

async function buildWithRollup(virtualModulesPlugin) {

  return new Promise(async (resolve, reject) => {
    process.chdir('../');
    let chunks = null;
    let firstBuild = true;

    try {
      process.env.ROLLUP_WATCH = 'true';
      const { options } = await loadConfigFile(configPath, { format: 'es' });
      const [{ output: [outputOptions], ...inputOptions }] = options;
      const watcher = rollup.watch({ ...inputOptions, cache: false, output: outputOptions, watch: {
        skipWrite: true,
        // chokidar: {
        //   awaitWriteFinish: {
        //     stabilityThreshold: 2000,
        //     pollInterval: 100
        //   },
        //   interval: 1000,
        // },
        buildDelay: 500
      } });
  
      watcher.on('event', async event => {
        if (firstBuild) {
          console.log(event.code);
          if (event.code === 'BUNDLE_END') {
            const { output } = await event.result.generate(outputOptions);
            chunks = output.filter(module => module.type === 'chunk');
            firstBuild = false;
            process.chdir('example');
            resolve(chunks);
          }
          if (event.code === 'ERROR') {
            console.log(event);
            process.chdir('example');
          }
        } else {
          console.log(event.code);
          if (event.code === 'BUNDLE_START') process.chdir('../');
          if (event.code === 'BUNDLE_END') {
            console.log('rebuild');
            const { output } = await event.result.generate(outputOptions);
            chunks = output.filter(module => module.type === 'chunk');
            for (const chunk of output) virtualModulesPlugin.writeModule('./node_modules/@webmd/' + chunk.fileName, chunk['code']);
            //console.log(output.find(({ fileName }) => fileName === 'IconStore.js'));
            process.chdir('example');
          }
          if (event.code === 'ERROR') {
            console.log(event);
            process.chdir('example');
          }
        }
      });

    } catch (error) {
      reject(error);
    } finally {
      //process.chdir('example');
    }
  
    //resolve(chunks);

  });
}

module.exports = class RollupPlugin {

  apply(compiler) {

    const virtualModulesPlugin = new VirtualModulesPlugin({});
    virtualModulesPlugin.apply(compiler);

    let output = null;
    let error = null;

    async function writeChunks() {
      try {
        output = await buildWithRollup(virtualModulesPlugin);
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

    //watch('../src', writeChunks);
  }
}
