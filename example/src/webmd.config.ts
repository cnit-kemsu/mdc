import IconStore from '@webmd/IconStore';

(function (files: __WebpackModuleApi.RequireContext) {
  for (const key of files.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = files(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '@webmd/styles';
import '@webmd/components/Icon';
import '@webmd/components/SelectOption';
import '@webmd/components/Button';
import '@webmd/components/Checkbox';
import '@webmd/components/RadioButton';
import '@webmd/components/TextField';
import '@webmd/components/IconButton';
import '@webmd/components/Select';
import '@webmd/components/DateField';
import '@webmd/asd';