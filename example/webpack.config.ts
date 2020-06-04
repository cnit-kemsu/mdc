import path from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import build from './build';

class MyWebpackPlugin {

  apply(compiler) {

    const afterEnvironmentHook = () => {
      const filesys = compiler.inputFileSystem;
      console.log(filesys);
      filesys._statStorage.data.set('/testdir/some.js', [null, 'export default const a = 5;']);
      filesys._readFileStorage.data.set('/testdir/some.js', [null, 'export default const a = 5;']);
      filesys._readdirStorage.data.set('/testdir', [null, 'export default const a = 5;']);
      filesys._stat('./dist1/file1.js');
      const dir = filesys._readdirSync('.');
      console.log(dir);
      console.log(filesys);
    }

    compiler.hooks.afterEnvironment.tap('VirtualModulesPlugin', afterEnvironmentHook);
  }
}

export default async () => {

  const output = await build();
  //console.log(output);

  const virtualModules = output.reduce((res, current) => {
    return {
      ...res,
      ['./node_modules/@mdc/' + current.fileName]: current['code'],
      //['../../src/' + current.fileName]: current['code'],
      //['../src/' + current.fileName]: current['code']
    };
  }, {});

  //console.log(virtualModules);

  return {
    mode: 'development',
    devtool: 'source-map',
    target: 'web',

    entry: './src/index.tsx',

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: {
            //loader: 'ts-loader?configFile=tsconfig.json',
            loader: 'ts-loader',
            options: {
              //transpileOnly: true,
              ignoreDiagnostics: [
                //'2339',
                //'2307'
              ],
            }
          },
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: 'svg-inline-loader'
        }
      ]
    },

    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      // alias: {
      //   '../../src': path.resolve(__dirname, '../dist'),
      // }
    },

    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new DefinePlugin({
        // 'window.mdc.appendInputElement': true,
        // 'window.mdc.implicitUncheck': true
      }),
      //new MyWebpackPlugin(),
      new VirtualModulesPlugin({
        ...virtualModules
        //'./node_modules/dist/a.js': 'module.exports = 15;',
        //'./node_modules/dist/b.js': 'const a = require("./a"); module.exports = a;'
      })
    ],

    optimization: {
      namedChunks: true,
      namedModules: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor'
          }
        }
      }
    },

    devServer: {
      port: 3000,
      historyApiFallback: true
    }
  };
}

// /node_modules\\(react|scheduler)/
// /node_modules\\(?!(react|scheduler))/
// --compress