import React from 'react';
import ReactDOM from 'react-dom';
import './register';

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