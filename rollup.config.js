import typescript from '@rollup/plugin-typescript';
import htmlTemplate from './plugin-html-template';

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
    htmlTemplate()
  ]
};