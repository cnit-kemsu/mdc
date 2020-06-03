const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const htmlTemplateLoader = require('./html-template-loader');

// see below for details on the options
const inputOptions = {
  input: 'src/index.ts',
  preserveModules: true,
  external: [
    'tslib'
  ],
  plugins: [
    typescript(),
    htmlTemplateLoader()
  ]
};
const outputOptions = {
  output: {
    dir: 'dist',
    format: 'cjs'
  }
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  //console.log(bundle.cache.modules[0]);
  //console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate output specific code in-memory
  // you can call this function multiple times on the same bundle object
  const { output } = await bundle.generate(outputOptions);
  console.log(output.map(o => o.type));

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      // For assets, this contains
      // {
      //   fileName: string,              // the asset file name
      //   source: string | Uint8Array    // the asset source
      //   type: 'asset'                  // signifies that this is an asset
      // }
      //console.log('Asset', chunkOrAsset);
    } else {
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
      //console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // or write the bundle to disk
  //await bundle.write(outputOptions);
}

build();