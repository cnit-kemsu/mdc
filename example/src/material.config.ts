import IconStore from '@material/IconStore';

(function (files: __WebpackModuleApi.RequireContext) {
  for (const key of files.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = files(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '@material/styles';
import '@material/components/Icon';
import '@material/components/SelectOption';
import '@material/components/Button';
import '@material/components/Checkbox';
import '@material/components/RadioButton';
import '@material/components/TextField';
import '@material/components/IconButton';
import '@material/components/Select';
import '@material/components/DateField';