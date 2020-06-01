import path from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',

  entry: './index.tsx',

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader?configFile=tsconfig.json',
        exclude: /node_modules/
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
      template: './index.html'
    }),
    new DefinePlugin({
      // 'window.mdc.appendInputElement': true,
      // 'window.mdc.implicitUncheck': true
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

// /node_modules\\(react|scheduler)/
// /node_modules\\(?!(react|scheduler))/
// --compress