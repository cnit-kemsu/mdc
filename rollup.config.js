// import typescript from '@rollup/plugin-typescript';
// import htmlTemplateLoader from './html-template-loader';
const typescript = require('@rollup/plugin-typescript');
const htmlTemplateLoader = require('./html-template-loader');

// export default {
module.exports = {

  input: 'src/index.ts',

  preserveModules: true,

  output: {
    dir: 'dist',
    format: 'cjs'
  },

  external: [
    'tslib'
  ],

  plugins: [
    typescript(),
    htmlTemplateLoader()
  ]
};