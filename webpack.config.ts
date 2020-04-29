import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//import { DuplicatesPlugin } from 'inspectpack/plugin';

export default {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',

  entry: './example/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader?configFile=tsconfig.json',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.html' ],
    //modules: ["src", "node_modules"]
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@lib': path.resolve(__dirname, 'src/lib/')
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // entry: './example/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'main.js',
  //   publicPath: '/'
  // },

  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       include: [
  //         'node_modules/@kemsu',
  //         'src',
  //         'example'
  //       ].map(incl => path.resolve(__dirname, incl)),
  //       loader: 'babel-loader'
  //     }
  //   ]
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
    //new DuplicatesPlugin({})
  ],

  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },

  optimization: {
    namedChunks: true,
    namedModules: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /node_modules/,
          name: 'vendor'
        }
      }
    }
  },
  // optimization: {
  //   namedChunks: true,
  //   namedModules: true,
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       // react: {
  //       //   test: /node_modules\\react(?!-dom)/,
  //       //   name: 'react1'
  //       // },
  //       // reactDom: {
  //       //   test: /node_modules\\react-dom/,
  //       //   name: 'react2'
  //       // },
  //       react: {
  //         test: /node_modules\\(react|scheduler)/,
  //         name: 'react'
  //       },
  //       // scheduler: {
  //       //   test: /node_modules\\scheduler/,
  //       //   name: 'scheduler'
  //       // },
  //       other: {
  //         test: /node_modules\\(?!(react|scheduler))/,
  //         name: 'other'
  //       }
  //     }
  //   }
  // },

  //--compress

  // resolve: {
  //   alias: {
  //     '@components': path.resolve(__dirname, 'src/components/'),
  //     '@hooks': path.resolve(__dirname, 'src/hooks/'),
  //     '@lib': path.resolve(__dirname, 'src/lib/')
  //   }
  // },

  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};

// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

// export default {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   target: 'web',

//   entry: './example/index.ts',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//     publicPath: '/'
//   },

//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         include: [
//           'src',
//           'example'
//         ].map(incl => path.resolve(__dirname, incl)),
//         loader: 'ts-loader'
//       }
//     ]
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './example/index.html'
//     })
//   ],

//   optimization: {
//     namedChunks: true,
//     namedModules: true,
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /node_modules/,
//           name: 'vendor',
//           chunks: 'all'
//         }
//       }
//     }
//   },

//   resolve: {
//     extensions: [".ts", ".tsx", ".js"], 
//     alias: {
//       '@components': path.resolve(__dirname, 'src/components/'),
//       '@hooks': path.resolve(__dirname, 'src/hooks/'),
//       '@lib': path.resolve(__dirname, 'src/lib/')
//     }
//   },

//   devServer: {
//     port: 3000,
//     historyApiFallback: true
//   }
// };