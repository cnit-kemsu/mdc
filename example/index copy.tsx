// import React, { createElement, useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';

// import Button from '@components/Button';
// import useRipple from '@hooks/useRipple';

// // import useRippleEffect from '@hooks/useRippleEffect';

// // function TextField(props) {
// //   const [ref, ref1] = useRippleEffect();
// //   return (
// //     <div ref={ref}>
// //       <input ref={ref1} {...props} />
// //     </div>
// //   );
// // }

// let Checkbox = ({}, ref: React.Ref<HTMLInputElement>) => {
//   const ripple = useRipple();

//   return (
//     <div style={{ width: 'fit-content' }} onMouseDown={() => console.log('123')}>
//       {ripple}
//       <input type="checkbox" ref={ref} onMouseDown={() => console.log('asd')} />
//     </div>
//   );
// }
// Checkbox = React.forwardRef(Checkbox);
// Checkbox = React.memo(Checkbox);

// let TextField = ({}, ref: React.Ref<HTMLInputElement>) => {
//   const ripple = useRipple();

//   return (
//     <div style={{ width: 'fit-content' }}>
//       {ripple}
//       <input />
//     </div>
//   );
// }
// TextField = React.forwardRef(TextField);
// TextField = React.memo(TextField);

// // declare module JSX {
// //   interface IntrinsicElements {
// //     "md-button": MyCustomElementClass
// //   }
// // }

// // declare module JSX {
// //   interface IntrinsicElements {
// //       "md-button": MyCustomElementClass
// //   }
// // }

// // declare global {
// //   module JSX {
// //     interface IntrinsicElements {
// //       "md-button": MDButtonAttributes;
// //     }
// //   }
// // }

// // interface MDButtonAttributes {
// //   children: any;
// // }

// // class MyCustomElementClass extends HTMLElement {

// //   shadow: any;

// //   constructor() {
// //     super();

// //     //this.shadow = this.attachShadow({ mode: 'open' });
// //     console.log(this.innerHTML);
// //     //shadow.innerHTML = `<button>${this.innerHTML}</button>`;
// //   }

// //   connectedCallback() {
// //     //@ts-ignore
// //     const children = [...this.childNodes.values()];
// //     console.log(children);
// //     // const button = document.createElement('button');
// //     // //@ts-ignore
// //     // button.append(children);
// //     // this.appendChild(button);
// //     //this.innerHTML = `<button>${this.innerHTML}</button>` 
// //     this.shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
// //     this.shadow.innerHTML = `<button><slot></slot></button>`;
// //     //this.shadow.innerHTML = `<input type="text" />`;
// //   }

// // }

// // customElements.define('md-button', MyCustomElementClass);

// class MDButton extends HTMLElement {

//   shadow: ShadowRoot;

//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
//   }

//   connectedCallback() {
//     this.shadow.innerHTML = `
//       <button>
//       </button>
//       <slot></slot>
//       <div class="overlay" />
//     `;
//   }

// }

// customElements.define('md-button', MDButton);




// // const KEYCODE = {
// //   SPACE: 32,
// // };

// // const template = document.createElement('template');
// // template.innerHTML = `
// //   <style>
// //     :host {
// //       display: inline-block;
// //       background: url('https://googlechromelabs.github.io/howto-components/images/unchecked-checkbox.svg') no-repeat;
// //       background-size: contain;
// //       width: 24px;
// //       height: 24px;
// //     }
// //     :host([hidden]) {
// //       display: none;
// //     }
// //     :host([checked]) {
// //       background: url('https://googlechromelabs.github.io/howto-components/images/checked-checkbox.svg') no-repeat;
// //       background-size: contain;
// //     }
// //     :host([disabled]) {
// //       background:
// //         url('https://googlechromelabs.github.io/howto-components/images/unchecked-checkbox-disabled.svg') no-repeat;
// //       background-size: contain;
// //     }
// //     :host([checked][disabled]) {
// //       background:
// //         url('https://googlechromelabs.github.io/howto-components/images/checked-checkbox-disabled.svg') no-repeat;
// //       background-size: contain;
// //     }
// //   </style>
// // `;


// // class HowToCheckbox extends HTMLElement {
// //   static get observedAttributes() {
// //     return ['checked', 'disabled'];
// //   }

// //   constructor() {
// //     super();
// //     this.attachShadow({mode: 'open'});
// //     this.shadowRoot.appendChild(template.content.cloneNode(true));

// //     this._onKeyUp = this._onKeyUp.bind(this);
// //     this._onClick = this._onClick.bind(this);
// //   }

// //   connectedCallback() {
    
// //     if (!this.hasAttribute('role'))
// //       this.setAttribute('role', 'checkbox');
// //     if (!this.hasAttribute('tabindex'))
// //       //@ts-ignore
// //       this.setAttribute('tabindex', 0);

// //     this._upgradeProperty('checked');
// //     this._upgradeProperty('disabled');

// //     this.addEventListener('keyup', this._onKeyUp);
// //     this.addEventListener('click', this._onClick);
// //   }

// //   _upgradeProperty(prop) {
// //     if (this.hasOwnProperty(prop)) {
// //       let value = this[prop];
// //       delete this[prop];
// //       this[prop] = value;
// //     }
// //   }

// //   disconnectedCallback() {
// //     this.removeEventListener('keyup', this._onKeyUp);
// //     this.removeEventListener('click', this._onClick);
// //   }

// //   set checked(value) {
// //     const isChecked = Boolean(value);
// //     if (isChecked)
// //       this.setAttribute('checked', '');
// //     else
// //       this.removeAttribute('checked');
// //   }

// //   get checked() {
// //     return this.hasAttribute('checked');
// //   }

// //   set disabled(value) {
// //     const isDisabled = Boolean(value);
// //     if (isDisabled)
// //       this.setAttribute('disabled', '');
// //     else
// //       this.removeAttribute('disabled');
// //   }

// //   get disabled() {
// //     return this.hasAttribute('disabled');
// //   }

// //   attributeChangedCallback(name, oldValue, newValue) {
// //     const hasValue = newValue !== null;
// //     switch (name) {
// //       case 'checked':
// //         //@ts-ignore
// //         this.setAttribute('aria-checked', hasValue);
// //         break;
// //       case 'disabled':
// //         //@ts-ignore
// //         this.setAttribute('aria-disabled', hasValue);

// //         if (hasValue) {
// //           this.removeAttribute('tabindex');
// //           this.blur();
// //         } else {
// //           this.setAttribute('tabindex', '0');
// //         }
// //         break;
// //     }
// //   }

// //   _onKeyUp(event) {
// //     if (event.altKey)
// //       return;

// //     switch (event.keyCode) {
// //       case KEYCODE.SPACE:
// //         event.preventDefault();
// //         this._toggleChecked();
// //         break;
// //       default:
// //         return;
// //     }
// //   }

// //   _onClick(event) {
// //     this._toggleChecked();
// //   }

// //   _toggleChecked() {
// //     if (this.disabled)
// //       return;
// //     this.checked = !this.checked;
// //     this.dispatchEvent(new CustomEvent('change', {
// //       detail: {
// //         checked: this.checked,
// //       },
// //       bubbles: true,
// //     }));
// //   }
// // }

// // window.customElements.define('howto-checkbox', HowToCheckbox);

// declare global {
//   module JSX {
//     interface IntrinsicElements {
//       "howto-checkbox": any;
//       "md-button": any;
//     }
//   }
// }











// function App() {

//   return <div>
//     <Button style={{ top: '300px', left: '400px',
//     //width: '150px', height: '150px'
//     }} label="button" />
//     <div style={{ backgroundColor: 'aqua', padding: '15px' }}>
//       <Checkbox />
//       <TextField />
//     </div>

//     <div>
//       <input type="checkbox" />
//       <input type="radio" />
//     </div>

//     <button onMouseEnter={() => console.log('asd')}>asd</button>

//     <md-button class="howtochkbx">asdsad <div>123123</div></md-button>

//     {/* <howto-checkbox class="howtochkbx" /> */}

//     {/* <div id="wrapper" tabIndex={0} onClick={() => console.log('111')} className="asdasd" onFocus={() => console.log('focus div')} onBlur={() => console.log('div1')}>
//       <button className="qweqwe" onClick={
//         () => {
//           console.log('222');
//           // const eventFocus = new Event('focus');
//           // const wrapper = document.querySelector('#wrapper');
//           // console.log(wrapper);
//           // wrapper.dispatchEvent(eventFocus);
//         }
//       } onFocus={(event) => {
//         console.log(event);
//         console.log('focus btn');
//         const eventFocus = new Event('focus');
//         const wrapper = document.querySelector('#wrapper');
//         console.log(wrapper);
//         //@ts-ignore
//         wrapper.focus();
//         //wrapper.dispatchEvent(eventFocus);
//       }} onBlur={() => console.log('btn1')}>123</button>
//     </div> */}

//   {/* <md-button>asd<div>qwe</div></md-button> */}
    
//     {/* <form onSubmit={event => {
//       event.preventDefault();
//       console.log((event.target as HTMLFormElement).elements);
//     }}>
//       <input type="checkbox" name="asd" />
//       <input is="howto-checkbox" type="checkbox" name="qeqwe" />
//       <input type="submit" />
//     </form> */}

//   </div>;
// }

// const root = () => (
//   <App />
// );

// ReactDOM.render(
//   createElement(root),
//   document.getElementById('root')
// );
