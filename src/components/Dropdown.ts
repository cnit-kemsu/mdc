import customElement from '@internals/customElement';
import template from './Dropdown.html';

@customElement('md-dropdown')
export default class Dropdown extends HTMLElement {

  private _open: boolean = false;
  private style1: HTMLStyleElement;
  private style2: HTMLStyleElement;
  private timeout: any = null;
  private _targetElement: HTMLElement = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);

    const style1 = document.createElement('style');
    style1.innerHTML = `:host{display:none;}`;
    this.style1 = style1;

    const style2 = document.createElement('style');
    style2.innerHTML = `:host{transform:scale(1);opacity:1;}`;
    this.style2 = style2;

    this.appendStyle1 = this.appendStyle1.bind(this);
    this.appendStyle2 = this.appendStyle2.bind(this);

    this.shadowRoot.appendChild(this.style1);
  }

  static get observedAttributes() {
    return ['open'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'open':
        const open = newValue !== null;
        this._open = open;

        // const rect
        // = this.getBoundingClientRect();
        // console.log(rect);
        // console.log(document.documentElement.clientHeight);

        // const docHeight = document.documentElement.clientHeight;

        // let bottomOverflow = rect.bottom - docHeight;
        // if (bottomOverflow < 0) bottomOverflow = 0;
        // if (bottomOverflow > 0) {
        //   //this.style.setProperty('bottom', '56px');
        // } else {
        //   //this.style.setProperty('top', '56px');
        // }

        if (open) {
          if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          else this.shadowRoot.removeChild(this.style1);
          requestAnimationFrame(this.appendStyle2);
        } else {
          this.shadowRoot.removeChild(this.style2);
          this.timeout = setTimeout(this.appendStyle1, 75);
        }
        break;
    }
  }

  appendStyle1() {
    this.shadowRoot.appendChild(this.style1);
    this.timeout = null;
    //this.style.removeProperty('bottom');
    //this.style.removeProperty('top');
  }
  appendStyle2() {
    this.shadowRoot.appendChild(this.style2);
  }

  get targetElement(): HTMLElement {
    return this._targetElement;
  }
  set targetElement(value: HTMLElement) {
    this._targetElement = value || null;
  }

  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (value === this._open) return;
    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');
  }
}

// import customElement from '@internals/customElement';
// import template from './Dropdown.html';

// @customElement('md-dropdown')
// export default class Dropdown extends HTMLElement {

//   private _open: boolean = false;
//   private style1: HTMLStyleElement;
//   private style2: HTMLStyleElement;

//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.appendChild(template.fragment);

//     const style1 = document.createElement('style');
//     style1.innerHTML = `:host{display: none;}`;
//     this.style1 = style1;

//     const style2 = document.createElement('style');
//     style2.innerHTML = `:host {
//       transform: scale(1);
//       opacity: 1;
//       transition: opacity 30ms linear, transform 120ms ease;
//     }`;
//     this.style2 = style2;

//     this.appendStyle2 = this.appendStyle2.bind(this);
//     this.appendStyle1 = this.appendStyle1.bind(this);

//     this.appendStyle1();
//   }

//   private opening = false;
//   static get observedAttributes() {
//     return ['open'];
//   }
//   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//     switch (name) {
//       case 'open':
//         const open = newValue !== null;
//         if (!this.opening && open && !this._open) {
//           console.log(1);
//           this.opening = true;
//           this.removeAttribute('open');
//           try {
//             this.shadowRoot.removeChild(this.style1);
//           } catch(err) {}
//         } else if (this.opening) {
//           console.log(2);
//           this.opening = false;
//           this._open = true;
//           requestAnimationFrame(() => this.setAttribute('open', ''));
//         } else {
//           console.log(3);
//           //this._open = open;
//           if (open) {
//             //this.shadowRoot.removeChild(this.style1);

//             //const { top, left, bottom, right }
//             const rect
//             = this.getBoundingClientRect();
//             console.log(rect);
//             console.log(document.documentElement.clientHeight);

//             const docHeight = document.documentElement.clientHeight;

//             let bottomOverflow = rect.bottom - docHeight;
//             if (bottomOverflow < 0) bottomOverflow = 0;
//             if (bottomOverflow > 0) {
//               //this.style.setProperty('bottom', '56px');
//             } else {
//               //this.style.setProperty('top', '56px');
//             }

//             //requestAnimationFrame(this.appendStyle2);
//           } else {
//             this._open = false;
//             //this.shadowRoot.removeChild(this.style2);
//             setTimeout(this.appendStyle1, 1075);
//           }
//         }
//         break;
//     }
//   }

//   appendStyle2() {
//     this.shadowRoot.appendChild(this.style2);
//   }
//   appendStyle1() {
//     !this._open && this.shadowRoot.appendChild(this.style1);
//     //this.style.removeProperty('bottom');
//     //this.style.removeProperty('top');
//   }

//   get open(): boolean {
//     return this._open;
//   }
//   set open(value: boolean) {
//     if (value === this._open) return;
//     if (value) this.setAttribute('open', '');
//     else this.removeAttribute('open');
//   }
// }