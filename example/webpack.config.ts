import path from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import RollupPlugin from './build';

export default async () => {

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
              ]
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
      // new VirtualModulesPlugin({
      //   ...virtualModules
      //   //'./node_modules/dist/a.js': 'module.exports = 15;',
      //   //'./node_modules/dist/b.js': 'const a = require("./a"); module.exports = a;'
      // })
      new RollupPlugin()
    ],

    watch: true,

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