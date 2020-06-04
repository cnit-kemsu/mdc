// process.chdir('../');

// const rollup = require('../node_modules/rollup');
// // const typescript = require('../node_modules/@rollup/plugin-typescript');
// // const htmlTemplateLoader = require('../html-template-loader');
// const { output: outputOptions, ...inputOptions } = require('../rollup.config');

// const inputOptions = {
//   input: 'src/index.ts',
//   preserveModules: true,
//   external: [
//     'tslib'
//   ],
//   plugins: [
//     typescript({ declaration: false }),
//     htmlTemplateLoader()
//   ]
// };

// const outputOptions = {
//   output: {
//     dir: 'dist',
//     format: 'cjs'
//   }
// };

export default async function build() {

  process.chdir('../');
  //console.log(process.cwd());

  const rollup = require('../node_modules/rollup');
  const { output: outputOptions, ...inputOptions } = require('../rollup.config');

  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);

  const _output = output;
  //const _output = output.filter(o => o.type === 'chunk');

  //console.log(_output.map(o => o.type));
  // console.log(_output[10]);

  process.chdir('example');
  //console.log(process.cwd());

  // await bundle.write(outputOptions);

  return _output;
}

// async function main() {
//   try {
//     await build();
//   } catch(error) {
//     console.log(error);
//   } finally {
//     process.exit(0);
//   }
// }

// main();

// For assets, this contains
// {
//   fileName: string,              // the asset file name
//   source: string | Uint8Array    // the asset source
//   type: 'asset'                  // signifies that this is an asset
// }

// For chunks, this contains
// {
//   code: string,                  // the generated JS code
//   dynamicImports: string[],      // external modules imported dynamically by the chunk
//   exports: string[],             // exported variable names
//   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
//   fileName: string,              // the chunk file name
//   imports: string[],             // external modules imported statically by the chunk
//   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
//   isEntry: boolean,              // is this chunk a static entry point
//   map: string | null,            // sourcemaps if present
//   modules: {                     // information about the modules in this chunk
//     [id: string]: {
//       renderedExports: string[]; // exported variable names that were included
//       removedExports: string[];  // exported variable names that were removed
//       renderedLength: number;    // the length of the remaining code in this module
//       originalLength: number;    // the original length of the code in this module
//     };
//   },
//   name: string                   // the name of this chunk as used in naming patterns
//   type: 'chunk',                 // signifies that this is a chunk
// }