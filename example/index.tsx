import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from '@components/Overlay/index';
import RippleOverlay from '@components/RippleOverlay/index';
import Button from '@components/Button/index';
import Checkbox from '@components/Checkbox/index';
import RadioButton from '@components/RadioButton/index';
import TextField from '@components/TextField/index';

customElements.define('md-overlay', Overlay);
customElements.define('md-ripple-overlay', RippleOverlay);
customElements.define('md-button', Button);
customElements.define('md-checkbox', Checkbox);
customElements.define('md-radio', RadioButton);
customElements.define('md-textfield', TextField);

declare global {
  module JSX {
    interface IntrinsicElements {
      'md-button': any;
      'md-checkbox': any;
      'md-textfield': any;
    }
  }
}

function App() {

  const [value, setValue] = React.useState('');

  return <div>
    <md-checkbox disabled children="sdasd" />
    <md-checkbox disabled children="sdasd" />
    <button children="sdasd" onClick={event => console.log('click', event.bubbles)} />
    <md-button raised outlined children="sdasd" onClick={() => console.log('click')} />
    <md-button outlined raised children="sdasd" disabled onClick={() => console.log('click')} />
    <md-checkbox onInput={event => console.log(event.target.checked)} checked children="sdasd" />
    <md-checkbox disabled children="sdasd" />
    <md-textfield 
    onInput={event => console.log('input', event.target.value)} 
    onChange={event => console.log('change', event.target.value)} />
    <md-checkbox onChange={event => console.log('change', event.target)} onInput={event => console.log('input', event.target)} />
    <input type="checkbox" onChange={event => console.log('change', event.nativeEvent)} onInput={event => console.log('input', event.nativeEvent)} />
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);