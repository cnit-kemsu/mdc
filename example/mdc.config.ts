import IconStore from '@mdc/IconStore';

(function (modules: __WebpackModuleApi.RequireContext) {
  for (const key of modules.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = modules(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '@mdc/styles';
import '@mdc/components/Icon';
import '@mdc/components/SelectOption';
import '@mdc/components/Button';
import '@mdc/components/Checkbox';
import '@mdc/components/RadioButton';
import '@mdc/components/TextField';
import '@mdc/components/IconButton';
import '@mdc/components/Select';
import '@mdc/components/DateField';