import React from 'react';
import ReactDOM from 'react-dom';

declare global {
  module JSX {
    interface IntrinsicElements {
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

require('./webmd.config');