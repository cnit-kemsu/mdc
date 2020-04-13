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






// const MDButtonTemplate = document.getElementById('md-button') as HTMLTemplateElement;

// class MDButton extends HTMLElement {

//   //content: HTMLDivElement;

//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open', delegatesFocus: true });
    
//     const child = MDButtonTemplate.content.cloneNode(true);
//     //this.content = child.childNodes[3].childNodes[3] as HTMLDivElement;
//     // console.log(content.nodeValue);
//     //content.innerHTML = this.innerHTML;
//     //console.log(content.innerHTML);
//     //@ts-ignore
//     //this.innerHTML = null;
//     //child.innerHTML = `` + this.innerHTML + ``;
//     this.shadowRoot.appendChild(child);
//     // this.shadowRoot.innerHTML = `
//     // <style>
//     //   .wrapper {
//     //     position: relative;
//     //     height: 100%;

//     //     display: inline-block;
//     //     width: 100%;
//     //   }
//     //   /* .wrapper::before {
//     //     content: '';
//     //     background-color: wheat;
//     //     width: 100%;
//     //     height: 100%;
//     //     position: absolute;
//     //     top: 0px;
//     //     left: 0px;
//     //   } */
//     //   .wrapper:hover {
//     //     background-color: khaki;
//     //   }
//     //   .button {
//     //     opacity: 0;
//     //     position: absolute;
//     //     width: 100%;
//     //     height: 100%;
//     //     left: 0px;
//     //     top: 0px;
//     //   }
//     //   .overlay  {
//     //     position: absolute;
//     //     width: 100%;
//     //     height: 100%;
//     //     background: antiquewhite;
//     //     top: 0px;
//     //     left: 0px;

//     //     display: inline-block;
//     //     width: 100%;
//     //   }
//     //   .content {
//     //     position: relative;

//     //     display: inline-block;
//     //     width: 100%;
//     //   }
//     //   .content1 {
//     //     width: 100%;
//     //   }
//     //   /* .overlay::after  {
//     //     position: absolute;
//     //     width: 100%;
//     //     height: 100%;
//     //     background: antiquewhite; 
//     //     top: 0px;
//     //     left: 0px;
//     //     content: '';
//     //   } */
//     // </style>
//     // <div class="wrapper">
//     //   <div class="overlay"></div>
//     //   <div class="content">
//     //     ${inner}
//     //   </div>
//     //   <button class="button"></button>
//     // </div>`;
//   }

//   // connectedCallback() {
//   //   // this.content.innerHTML = this.innerHTML;
//   //   // this.innerHTML = '';
//   // }

// }

// customElements.define('md-button', MDButton);

// declare global {
//   module JSX {
//     interface IntrinsicElements {
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

//     <md-button style={{ height: '200px' }} class="md-button" onClick={() => console.log('123')}>asdsad <div>123123</div></md-button>
//     <md-button style={{ height: '200px' }} class="md-button" onClick={() => console.log('111')}><div style={{ height: '100%' }}>qweqwe zxczxc</div></md-button>
//     <button>asdsad <div>123123</div></button>
//     <button><div>qweqwe zxczxc</div></button>

//   </div>;
// }

// const root = () => (
//   <App />
// );

// ReactDOM.render(
//   createElement(root),
//   document.getElementById('root')
// );
