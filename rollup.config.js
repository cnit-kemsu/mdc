import typescript from '@rollup/plugin-typescript';
import htmlTemplateLoader from './html-template-loader';
import path from 'path';

export default {

  input: 'src/index.ts',

  // preserveModules: true,
  manualChunks(id) {  
    
    // if (id.includes('node_modules')) {
    if (id.substr(__dirname.length + 1, 12) === 'node_modules') {
      return path.relative(__dirname, id).slice(0, -3);
    }
    const srcDir = path.resolve(__dirname, 'src');
    if (id.slice(-4) === 'html') {
      //return path.relative(srcDir, id).slice(0, -4) + 'template';
      return path.relative(srcDir, id).slice(0, -5);
    }
    return path.relative(srcDir, id).slice(0, -3);
  },
  //manualChunks: id => path.parse(id).name,
  
  cache: false,
  treeshake: false,

  output: {
    dir: 'dist',
    format: 'cjs',
    chunkFileNames: '[name].js',
  },

  plugins: [
    typescript(),
    htmlTemplateLoader()
  ]
};