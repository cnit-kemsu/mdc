import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from '@components/Overlay/index';
import Button from '@components/Button/index';
import Checkbox from '@components/Checkbox/index';

customElements.define('md-overlay', Overlay);
customElements.define('md-button', Button);
customElements.define('md-checkbox', Checkbox);

declare global {
  module JSX {
    interface IntrinsicElements {
      'md-button': any;
      'md-checkbox': any;
    }
  }
}

function App() {

  return <div>
    <md-button raised children="sdasd" />
    <md-button children="sdasd" />
    <md-checkbox checked children="sdasd" />
    <md-checkbox disabled children="sdasd" />
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
