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
      'ce-element': any;
    }
  }
}

import HTMLTemplate from '@lib/HTMLTemplate';
const template = new HTMLTemplate(`
  <style>
    :host {
      display: inline-block;
    }
    ::slotted(div) {
      background-color: red;
    }
  </style>
  <div>123123</div>
  <slot></slot>
`);
class CustomElement extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);
    
  }

  connectedCallback() {
    this.innerHTML = '<div>asdasd</div>';
  }

}
customElements.define('ce-element', CustomElement);

function App() {

  return <div>
    <md-button raised outlined children="sdasd" />
    <md-button outlined raised children="sdasd" disabled />
    <md-checkbox onInput={event => console.log(event.target.checked)} checked children="sdasd" />
    <md-checkbox disabled children="sdasd" />
    <md-textfield onInput={event => console.log(event.target.value)} />
    <ce-element></ce-element>
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);