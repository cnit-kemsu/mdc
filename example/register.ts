import { IconStore } from '@lib';

(function (modules: __WebpackModuleApi.RequireContext) {
  for (const key of modules.keys()) {
    const name = key.match(/[a-zA-Z0-9_-]+/)[0];
    const content = modules(key);
    IconStore.set(name, content);
  }
}(require.context('./icons', false, /.svg/, 'sync')))

import '@components/Icon';
import '@components/base/Overlay';
import '@components/base/RippleOverlay';
import '@components/SelectOption';
import '@components/Button';
import '@components/Checkbox';
import '@components/RadioButton';
import '@components/TextField';
import '@components/IconButton';
import '@components/Select';
import '@components/DateField';

