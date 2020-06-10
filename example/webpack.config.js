const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RollupPlugin = require('./RollupPlugin');

module.exports = {

  mode: 'development',
  devtool: 'source-map',
  target: 'web',

  entry: './src/index.tsx',

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      }
    ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // new DefinePlugin({
    //   'window.mdc.appendInputElement': true,
    //   'window.mdc.implicitUncheck': true
    // }),
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

// /node_modules\\(react|scheduler)/
// /node_modules\\(?!(react|scheduler))/
// --compress