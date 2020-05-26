// import IconStore from '../src/IconStore';

// (function (modules: __WebpackModuleApi.RequireContext) {
//   for (const key of modules.keys()) {
//     const name = key.match(/[a-zA-Z0-9_-]+/)[0];
//     const content = modules(key);
//     IconStore.set(name, content);
//   }
// }(require.context('./icons', false, /.svg/, 'sync')))

// import '../src/components/Icon';
// import '../src/components/SelectOption';
// import '../src/components/Button';
// import '../src/components/Checkbox';
// import '../src/components/RadioButton';
// import '../src/components/TextField';
// import '../src/components/IconButton';
// import '../src/components/Select';
// import '../src/components/DateField';

import IconStore from '../dist/src/IconStore';

(function (modules: __WebpackModuleApi.RequireContext) {
  for (const key of modules.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = modules(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '../dist/src/components/Icon';
import '../dist/src/components/SelectOption';
import '../dist/src/components/Button';
import '../dist/src/components/Checkbox';
import '../dist/src/components/RadioButton';
import '../dist/src/components/TextField';
import '../dist/src/components/IconButton';
import '../dist/src/components/Select';
import '../dist/src/components/DateField';

// import IconStore from 'dist/src/IconStore';

// (function (modules: __WebpackModuleApi.RequireContext) {
//   for (const key of modules.keys()) {
//     const name = key.match(/[a-zA-Z0-9_-]+/)[0];
//     const content = modules(key);
//     IconStore.set(name, content);
//   }
// }(require.context('./icons', false, /.svg/, 'sync')))

// import 'dist/src/components/Icon';
// import 'dist/src/components/SelectOption';
// import 'dist/src/components/Button';
// import 'dist/src/components/Checkbox';
// import 'dist/src/components/RadioButton';
// import 'dist/src/components/TextField';
// import 'dist/src/components/IconButton';
// import 'dist/src/components/Select';
// import 'dist/src/components/DateField';