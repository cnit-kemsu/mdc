import typescript from '@rollup/plugin-typescript';
import htmlTemplateLoader from './html-template-loader';

export default {

  preserveModules: true,

  input: 'src/index.ts',

  output: {
    dir: 'dist',
    format: 'cjs'
  },

  plugins: [

    typescript(),

    htmlTemplateLoader()

  ]
};