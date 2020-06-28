const path = require('path');
const VirtualModulesPlugin = require('webpack-virtual-modules');

const rollup = require('../node_modules/rollup');
const loadConfigFile = require('../node_modules/rollup/dist/loadConfigFile');

const configPath = path.resolve(__dirname, '../rollup.config.js');

function createRollupWatcher(writeChunks, setError, timings) {
  return new Promise(async (resolve, reject) => {
    let watcher = null;

    try {
      let chunks = null;
      let isFirstBuild = true;

      process.chdir('../'); //change dir

      process.env.ROLLUP_WATCH = 'true';
      const { options } = await loadConfigFile(configPath, { format: 'es' });
      const [{ output: [outputOptions], ...inputOptions }] = options;

      watcher = rollup.watch({
        ...inputOptions,
        cache: true,
        output: outputOptions,
        watch: {
          skipWrite: true,
          buildDelay: 500
        }
      });

      watcher.on('event', async event => {
        //console.log(event.code);

        if (isFirstBuild) {

          if (event.code === 'BUNDLE_END') {
            const { output } = await event.result.generate(outputOptions);
            chunks = output.filter(module => module.type === 'chunk');
            isFirstBuild = false;

            process.chdir('example'); //change dir

            writeChunks(chunks);
            resolve(watcher);
          }

          if (event.code === 'ERROR') {
            isFirstBuild = false;

            process.chdir('example'); //change dir

            setError(event.error);
            resolve(watcher);
          }

        } else {

          if (event.code === 'BUNDLE_START') process.chdir('../'); //change dir

          if (event.code === 'BUNDLE_END') {
            const { output } = await event.result.generate(outputOptions);
            chunks = output.filter(module => module.type === 'chunk');

            process.chdir('example'); //change dir
            
            writeChunks(chunks);
            const { lastError, lastBundle } = timings;
            if (lastError < lastBundle) setError(null);
            timings.lastBundle = new Date();
          }

          if (event.code === 'ERROR') {
            process.chdir('example'); //change dir

            setError(event.error);
          }

        }
      });

    } catch (error) {
      process.chdir('example'); //change dir

      setError(error);
      resolve(watcher);
    }

  });
}

module.exports = class RollupPlugin {

  apply(compiler) {

    const virtualModulesPlugin = new VirtualModulesPlugin({});
    virtualModulesPlugin.apply(compiler);

    let rollupWatcher = null;
    let error = null;
    const timings = {
      lastError: new Date(),
      bundleTime: new Date()
    };
    

    function writeChunks(chunks) {
      for (const chunk of chunks) virtualModulesPlugin.writeModule('./node_modules/@webmd/' + chunk.fileName, chunk['code']);
    }
    function setError(err) {
      timings.lastError = new Date();
      error = err;
    }

    process.on('uncaughtException', function(err) {
      //if (err['plugin'] !== 'typescript') throw err;
      setError(err);
      console.log(err);
    });
    

    compiler.hooks.beforeCompile.tapAsync('RollupPlugin', async function (params, callback) {
      if (rollupWatcher === null) rollupWatcher = await createRollupWatcher(writeChunks, setError, timings);
      callback();
    });

    compiler.hooks.compilation.tap('RollupPlugin', function (compilation) {
      if (error !== null) compilation.errors.push(error.message);
    });

  }
}
