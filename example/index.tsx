import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from '@components/Overlay/index';
import Button from '@components/Button/index';
import Radio from '@components/Radio/index';

customElements.define('md-overlay', Overlay);
customElements.define('md-button', Button);
customElements.define('md-radio', Radio);

declare global {
  module JSX {
    interface IntrinsicElements {
      'md-button': any;
      'md-radio': any;
    }
  }
}

function App() {

  return <div>
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
