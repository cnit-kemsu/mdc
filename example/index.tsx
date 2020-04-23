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

  return <div>
    <md-button raised outlined onClick={() => console.log('click')}>Click me</md-button>
    <md-button outlined raised disabled onClick={() => console.log('click')}>Click me</md-button>

    <md-checkbox onInput={event => console.log(event.target.checked)} />
    <md-checkbox disabled onInput={event => console.log(event.target.checked)} />

    <md-textfield onInput={event => console.log('input', event.target.value)} />
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);