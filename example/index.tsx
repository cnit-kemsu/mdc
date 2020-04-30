import React from 'react';
import ReactDOM from 'react-dom';


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

  return <div style={{ padding: '20px' }}>
    <md-button icon="copyright" raised label="Click me" onClick={() => console.log('click')} />
    <md-button outlined label="Click me" disabled onClick={() => console.log('click')} />

    <md-checkbox onInput={event => console.log(event.target.checked)} />
    <md-checkbox disabled onInput={event => console.log(event.target.checked)} />

    <md-textfield onInput={event => console.log('input', event.target.value)} />
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

require('./register');