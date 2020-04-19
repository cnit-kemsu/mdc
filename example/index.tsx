import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from '@components/Overlay/index';
import Button from '@components/Button/index';
import Checkbox from '@components/Checkbox/index';
import TextField from '@components/TextField/index';

customElements.define('md-overlay', Overlay);
customElements.define('md-button', Button);
customElements.define('md-checkbox', Checkbox);
customElements.define('md-textfield', TextField);

// const createElement = React.createElement;
// //@ts-ignore
// React.createElement = (type, props, ...children) => {
//   //console.log(type);
//   const newProps = { ...props };
//   if (type === 'md-checkbox') {
//     newProps.ref = (element: any) => {
//       if (newProps.onChange) element.addEventListener('change', newProps.onChange);
//     }
//   }
//   return createElement(type, newProps, ...children);
// };

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
    {/* <md-button raised children="sdasd" />
    <md-button children="sdasd" />
    <md-checkbox checked children="sdasd" />
    <md-checkbox disabled children="sdasd" /> */}
    <md-checkbox onChange={() => console.log('111')} onClick={() => console.log('222')} onBlur={() => console.log('444')} />
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


const targetNode = document.getElementById('editable');

const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationsList, observer) {
  console.log(mutationsList);

  // for(let mutation of mutationsList) {
  //     if (mutation.type === 'childList') {
  //         console.log('A child node has been added or removed.');
  //     }
  //     else if (mutation.type === 'attributes') {
  //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
  //     }
  // }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);