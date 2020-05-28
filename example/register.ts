import IconStore from '../dist/IconStore';

(function (modules: __WebpackModuleApi.RequireContext) {
  for (const key of modules.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = modules(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '../dist/components/Icon';
import '../dist/components/SelectOption';
import '../dist/components/Button';
import '../dist/components/Checkbox';
import '../dist/components/RadioButton';
import '../dist/components/TextField';
import '../dist/components/IconButton';
import '../dist/components/Select';
import '../dist/components/DateField';