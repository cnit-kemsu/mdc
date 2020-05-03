import { setIcon } from '@components/Icon';

export function registerIcon(fileName: string) {
  setIcon(fileName, require(`./icons/${fileName}.svg`));
}

registerIcon('favorite');
registerIcon('copyright');

import Overlay from '@components/base/Overlay';
import RippleOverlay from '@components/base/RippleOverlay';
import Icon from '@components/Icon';
import SelectOption from '@components/SelectOption';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import RadioButton from '@components/RadioButton';
import TextField from '@components/TextField';
import IconButton from '@components/IconButton';
import Select from '@components/Select';

customElements.define('md-overlay', Overlay);
customElements.define('md-ripple-overlay', RippleOverlay);
customElements.define('md-icon', Icon);
customElements.define('md-option', SelectOption);
customElements.define('md-button', Button);
customElements.define('md-checkbox', Checkbox);
customElements.define('md-radio', RadioButton);
customElements.define('md-textfield', TextField);
customElements.define('md-iconbtn', IconButton);
customElements.define('md-select', Select);
