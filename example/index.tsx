import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from '@components/Overlay/index';
import Button from '@components/Button/index';

customElements.define('md-overlay', Overlay);
customElements.define('md-button', Button);

declare global {
  module JSX {
    interface IntrinsicElements {
      'md-button': any;
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
