import typescript from '@rollup/plugin-typescript';
import htmlTemplateLoader from './html-template-loader';

export default {

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