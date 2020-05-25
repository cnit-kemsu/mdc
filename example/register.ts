import IconStore from '../src/IconStore';

(function (modules: __WebpackModuleApi.RequireContext) {
  for (const key of modules.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = modules(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '../src/components/Icon';
import '../src/components/SelectOption';
import '../src/components/Button';
import '../src/components/Checkbox';
import '../src/components/RadioButton';
import '../src/components/TextField';
import '../src/components/IconButton';
import '../src/components/Select';
import '../src/components/DateField';

