//// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
import IconStore from '@mdc/IconStore';
console.log(IconStore);

declare global {
  module JSX {
    interface IntrinsicElements {
      'md-textfield': any;
      'md-select': any;
      'md-option': any;
    }
  }
}

function App() {

  const [show, setShow] = React.useState(false);
  const [val, chval] = React.useState(2);

  return <div style={{ padding: '20px' }}>
    <md-button leading-icon="favorite" raised label="Click me" onClick={() => console.log('click')} />
    <md-button trailing-icon="copyright" outlined label="Click me" disabled onClick={() => console.log('click')} />

    <md-checkbox onInput={event => console.log(event.target.checked)} />
    <md-checkbox disabled onInput={event => console.log(event.target.checked)} />

    <md-textfield disabled={false || null} onInput={event => console.log('input', event.target.value)} />
    <button disabled={false}>asd</button>

    <button onClick={() => setShow(!show)}>show/unshow</button>
    <button onClick={() => chval(4)}>chval</button>
    <md-select value="1">
      <md-option value="1" label="asd" />
      <md-option value={val} label="qwe" />
      {show && <md-option value="3" label="zxc" />}
    </md-select>
    <md-datefield></md-datefield>
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

require('./mdc.config');

// import IconStore from '@mdc/IconStore';

// (function (modules: __WebpackModuleApi.RequireContext) {
//   for (const key of modules.keys()) {
//     const name = key.match(/[a-zA-Z0-9_-]+/)[0];
//     const content = modules(key);
//     IconStore.set(name, content);
//   }
// }(require.context('./icons', false, /.svg/, 'sync')))

// import '@mdc/styles';
// import '@mdc/components/Icon';
// import '@mdc/components/SelectOption';
// import '@mdc/components/Button';
// import '@mdc/components/Checkbox';
// import '@mdc/components/RadioButton';
// import '@mdc/components/TextField';
// import '@mdc/components/IconButton';
// import '@mdc/components/Select';
// import '@mdc/components/DateField';