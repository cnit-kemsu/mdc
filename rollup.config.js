import typescript from '@rollup/plugin-typescript';
import htmlTemplateLoader from './html-template-loader';
import path from 'path';
import glob from 'glob';

// const files = glob.sync('src/**/*.ts').reduce(
//   (filesMap, file) => {
//     if (file.slice(-5) === '.d.ts') return filesMap;
//     if (file === 'src/index.ts') return filesMap;
//     //if (file.includes('src/components') && !file.includes('src/components/base') && file != 'src/components/base/InteractiveElement.ts') return filesMap;
//     if (file.includes('src/components') && file !== 'src/components/base/InteractiveElement.ts') return filesMap;
//     return {
//       ...filesMap,
//       [file.slice(4)]: file
//     }
//   },
//   {}
// );
// console.log(files);

export default {

  input: 'src/index.ts',
  //input: files,
  // input: {
  //   'IconStore.ts': 'src/IconStore.ts',
  //   'lib/customElement.ts': 'src/lib/customElement.ts',
  //   'lib/HTMLTemplate.ts': 'src/lib/HTMLTemplate.ts',
  //   'lib/RadioNodeList.ts': 'src/lib/RadioNodeList.ts',
  //   'components/base/Overlay.ts': 'src/components/base/Overlay.ts'
  // },

  preserveModules: true,
  // manualChunks(id) {  
    
  //   // if (id.includes('node_modules')) {
  //   if (id.substr(__dirname.length + 1, 12) === 'node_modules') {
  //     return path.relative(__dirname, id).slice(0, -3);
  //   }
  //   const srcDir = path.resolve(__dirname, 'src');
  //   if (id.slice(-4) === 'html') {
  //     //return path.relative(srcDir, id).slice(0, -4) + 'template';
  //     return path.relative(srcDir, id).slice(0, -5);
  //   }
  //   return path.relative(srcDir, id).slice(0, -3);
  // },
  //manualChunks: id => path.parse(id).name,
  
  //cache: false,
  //treeshake: false,

  output: {
    dir: 'dist',
    format: 'cjs',
    //chunkFileNames: '[name].js',
    chunkFileNames: (...args) => {
      console.log(args);
      return 'asd.js'
    }
  },

  external: [
    'tslib'
  ],

  plugins: [
    typescript(),
    htmlTemplateLoader()
  ]
};