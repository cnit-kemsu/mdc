// const DEACTIVATION_TIMEOUT = 225;
// const DEACTIVATION_TIME = 150;

// export default class RippleEffect {
//   current: HTMLElement;
//   parent: HTMLElement;

//   // _cachedValues = {};
//   // isActive = false;
//   // requireDeactivation = false;
//   // activationTimeout;
//   // deactivationTimeout;
//   // focusElement = {};

//   constructor() {
//     // this.onTargetElementMousedown = this.onTargetElementMousedown.bind(this);
//     // this.onTargetElementMouseup = this.onTargetElementMouseup.bind(this);
//     // this.forwardRef = this.forwardRef.bind(this);
//     // this.setTargetElement = this.setTargetElement.bind(this);
//     // this.startDeactivation = this.startDeactivation.bind(this);
//     // this.finishDeactivation = this.finishDeactivation.bind(this);
//     // this.startActivation = this.startActivation.bind(this);
//     // this._startActivation = this._startActivation.bind(this);

//     this.setCurrent = this.setCurrent.bind(this);
//     this.onMousedown = this.onMousedown.bind(this);
//   }

//   setCurrent(element: HTMLElement) {
//     this.current = element;
//     this.parent = element.parentElement;

//     this.parent.addEventListener('mousedown', this.onMousedown);
//     //this.parent.addEventListener('mouseup', this.onMouseup);
//   }

//   onMousedown(event: MouseEvent) {

//     if (this.current == null) return;

//     const { clientWidth, clientHeight, offsetLeft, offsetTop } = this.parent;
//     //const rect = this.parent.getClientRects();
//     const size = Math.round(Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight));
//     //this.previousSize = size;
//     this.current.style.setProperty('--size', size + 'px');
    
//     const borderRadius = window.getComputedStyle(this.parent, null).borderRadius
//     this.current.style.setProperty('border-radius', borderRadius);

//     //this.current.style.setProperty('--left', 0 + 'px');
//     //this.current.style.setProperty('--top', 0 + 'px');
//     this.current.style.setProperty('--width', clientWidth + 'px');
//     this.current.style.setProperty('--height', clientHeight + 'px');

//     const centerX = -(size - clientWidth) / 2;
//     const centerY = -(size - clientWidth) / 2;
//     this.current.style.setProperty('--start-x', event.clientX - (offsetLeft + clientWidth / 2) + 'px');
//     this.current.style.setProperty('--start-y', event.clientY - (offsetTop + clientHeight / 2) + 'px');
//     this.current.style.setProperty('--end-x', -(size - clientWidth) / 2 + 'px');
//     this.current.style.setProperty('--end-y', -(size - clientHeight) / 2 + 'px');

//     // this.current.style.setProperty('--start-x', event.clientX - size / 2 + 'px');
//     // this.current.style.setProperty('--start-y', event.clientY - size / 2 + 'px');
//     // this.current.style.setProperty('--end-x', offsetLeft + clientWidth / 2 - event.clientX + 'px');
//     // this.current.style.setProperty('--end-y', offsetTop + clientHeight / 2 - event.clientY + 'px');
//     //const animation = 'ripple-transform-animation ease 1225ms forwards, ripple-opacity-animation ease 1175ms forwards';
//     this.current.style.removeProperty('--animation');
//     window.requestAnimationFrame(() => {
//       this.current.style.setProperty('--animation', 'var(--ripple-animation)');
//     });

//     // if (this.deactivationTimeout != null) {
//     //   clearTimeout(this.deactivationTimeout);
//     //   this.deactivationTimeout = null;
//     //   this.rippleElement.classList.remove('ripple-deactivation');
//     // }

//     // if (this.activationTimeout != null) {
//     //   clearTimeout(this.activationTimeout);
//     //   this.activationTimeout = null;
//     //   this.rippleElement.classList.remove('ripple-activation');
//     //   window.requestAnimationFrame(this._startActivation);
//     // } else this.startActivation();
    
//     // this.isActive = true;
//     // this.activationTimeout = setTimeout(this.startDeactivation, 225);
//   }

//   // startActivation() {
//   //   this.rippleElement.classList.add('ripple-activation');
//   // }

//   // _startActivation() {
//   //   window.requestAnimationFrame(this.startActivation);
//   // }

//   // finishDeactivation() {
//   //   this.deactivationTimeout = null;
//   //   this.rippleElement.classList.remove('ripple-deactivation');
//   // }

//   // startDeactivation() {
//   //   this.activationTimeout = null;
//   //   if (!this.isActive) {
//   //     this.requireDeactivation = false;
//   //     this.rippleElement.classList.remove('ripple-activation');
//   //     this.rippleElement.classList.add('ripple-deactivation');
//   //     this.deactivationTimeout = setTimeout(this.finishDeactivation, 150);
//   //   } else this.requireDeactivation = true;
//   // }

//   // /**
//   //  * @private
//   //  */
//   // getSize() {
//   //   const { offsetLeft, offsetTop, clientLeft, clientTop, clientWidth, clientHeight } = this.targetElement;
//   //   if (this._cachedValues.targetElement_clientWidth !== clientWidth || this._cachedValues.targetElement_clientHeight !== clientHeight) {
//   //     this._cachedValues.targetElement_clientWidth = clientWidth;
//   //     this._cachedValues.targetElement_clientHeight = clientHeight;
//   //     this._cachedValues.initialSize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight) /** 1.1 / 2*/ * 0.55;
//   //     this.rippleElement.style.setProperty('--size', this._cachedValues.initialSize + 'px');

//   //     this._cachedValues.targetElement_clientX = offsetLeft - clientLeft;
//   //     this._cachedValues.targetElement_clientY = offsetTop - clientTop;
//   //     this.rippleElement.style.setProperty('--end-x', (-this._cachedValues.initialSize + this._cachedValues.targetElement_clientWidth) / 2 + 'px');
//   //     this.rippleElement.style.setProperty('--end-y', (-this._cachedValues.initialSize + this._cachedValues.targetElement_clientHeight) / 2 + 'px');
//   //   }
//   // }

//   // /**
//   //  * @private
//   //  */
//   // onTargetElementMousedown(event) {

//   //   if (this.focusElement.current) this.focusElement.current.focus();

//   //   this.getSize();
//   //   this.rippleElement.style.setProperty('--start-x', event.clientX - this._cachedValues.targetElement_clientX - this._cachedValues.initialSize / 2 + 'px');
//   //   this.rippleElement.style.setProperty('--start-y', event.clientY - this._cachedValues.targetElement_clientY - this._cachedValues.initialSize / 2 + 'px');

//   //   if (this.deactivationTimeout != null) {
//   //     clearTimeout(this.deactivationTimeout);
//   //     this.deactivationTimeout = null;
//   //     this.rippleElement.classList.remove('ripple-deactivation');
//   //   }

//   //   if (this.activationTimeout != null) {
//   //     clearTimeout(this.activationTimeout);
//   //     this.activationTimeout = null;
//   //     this.rippleElement.classList.remove('ripple-activation');
//   //     window.requestAnimationFrame(this._startActivation);
//   //   } else this.startActivation();
    
//   //   this.isActive = true;
//   //   this.activationTimeout = setTimeout(this.startDeactivation, 225);
//   // }

//   // /**
//   //  * @private
//   //  */
//   // onTargetElementMouseup() {
//   //   this.isActive = false;
//   //   if (this.activationTimeout == null && this.requireDeactivation) this.startDeactivation();
//   // }

//   // /**
//   //  * @private
//   //  */
//   // _forwardRef() {
//   //   if (this.refProp == null) return;
//   //   if (typeof this.refProp === 'function') this.refProp(this.targetElement);
//   //   if (typeof this.refProp === 'object') this.refProp.current = this.targetElement;
//   // }

//   // forwardRef(refProp) {
//   //   if (this.refProp === refProp) return;
//   //   this.refProp = refProp;
//   //   if (this.targetElement === undefined) return;
//   //   this._forwardRef();
//   // }

//   // setTargetElement(element) {
    
//   //   if (element == null) {
//   //     if (this.targetElement != null) {
//   //       this.targetElement.classList.remove('ripple-container');
//   //       this.targetElement.removeEventListener('mousedown', this.onTargetElementMousedown);
//   //       this.targetElement.removeEventListener('mouseup', this.onTargetElementMouseup);
//   //       this.targetElement.removeChild(this.rippleElement);
//   //     }
//   //     this.rippleElement = null;
//   //   }

//   //   this.targetElement = element;
//   //   this._forwardRef();

//   //   if (element != null) {
//   //     this.rippleElement = document.createElement('span');
//   //     this.rippleElement.classList.add('ripple-effect');
//   //     this.targetElement.insertBefore(this.rippleElement, this.targetElement.firstChild);
//   //     this.targetElement.addEventListener('mousedown', this.onTargetElementMousedown);
//   //     this.targetElement.addEventListener('mouseup', this.onTargetElementMouseup);
//   //     this.targetElement.classList.add('ripple-container');
//   //   }
//   // } 
// }

// // //@ts-nocheck

// // const DEACTIVATION_TIMEOUT = 225;
// // const DEACTIVATION_TIME = 150;

// // export default class RippleEffect {
// //   targetElement;
// //   rippleElement;
// //   _cachedValues = {};
// //   isActive = false;
// //   requireDeactivation = false;
// //   activationTimeout;
// //   deactivationTimeout;
// //   focusElement = {};

// //   constructor() {    
// //     this.onTargetElementMousedown = this.onTargetElementMousedown.bind(this);
// //     this.onTargetElementMouseup = this.onTargetElementMouseup.bind(this);
// //     this.forwardRef = this.forwardRef.bind(this);
// //     this.setTargetElement = this.setTargetElement.bind(this);
// //     this.startDeactivation = this.startDeactivation.bind(this);
// //     this.finishDeactivation = this.finishDeactivation.bind(this);
// //     this.startActivation = this.startActivation.bind(this);
// //     this._startActivation = this._startActivation.bind(this);
// //   }

// //   startActivation() {
// //     this.rippleElement.classList.add('ripple-activation');
// //   }

// //   _startActivation() {
// //     window.requestAnimationFrame(this.startActivation);
// //   }

// //   finishDeactivation() {
// //     this.deactivationTimeout = null;
// //     this.rippleElement.classList.remove('ripple-deactivation');
// //   }

// //   startDeactivation() {
// //     this.activationTimeout = null;
// //     if (!this.isActive) {
// //       this.requireDeactivation = false;
// //       this.rippleElement.classList.remove('ripple-activation');
// //       this.rippleElement.classList.add('ripple-deactivation');
// //       this.deactivationTimeout = setTimeout(this.finishDeactivation, 150);
// //     } else this.requireDeactivation = true;
// //   }

// //   /**
// //    * @private
// //    */
// //   getSize() {
// //     const { offsetLeft, offsetTop, clientLeft, clientTop, clientWidth, clientHeight } = this.targetElement;
// //     if (this._cachedValues.targetElement_clientWidth !== clientWidth || this._cachedValues.targetElement_clientHeight !== clientHeight) {
// //       this._cachedValues.targetElement_clientWidth = clientWidth;
// //       this._cachedValues.targetElement_clientHeight = clientHeight;
// //       this._cachedValues.initialSize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight) /** 1.1 / 2*/ * 0.55;
// //       this.rippleElement.style.setProperty('--size', this._cachedValues.initialSize + 'px');

// //       this._cachedValues.targetElement_clientX = offsetLeft - clientLeft;
// //       this._cachedValues.targetElement_clientY = offsetTop - clientTop;
// //       this.rippleElement.style.setProperty('--end-x', (-this._cachedValues.initialSize + this._cachedValues.targetElement_clientWidth) / 2 + 'px');
// //       this.rippleElement.style.setProperty('--end-y', (-this._cachedValues.initialSize + this._cachedValues.targetElement_clientHeight) / 2 + 'px');
// //     }
// //   }

// //   /**
// //    * @private
// //    */
// //   onTargetElementMousedown(event) {

// //     if (this.focusElement.current) this.focusElement.current.focus();

// //     this.getSize();
// //     this.rippleElement.style.setProperty('--start-x', event.clientX - this._cachedValues.targetElement_clientX - this._cachedValues.initialSize / 2 + 'px');
// //     this.rippleElement.style.setProperty('--start-y', event.clientY - this._cachedValues.targetElement_clientY - this._cachedValues.initialSize / 2 + 'px');

// //     if (this.deactivationTimeout != null) {
// //       clearTimeout(this.deactivationTimeout);
// //       this.deactivationTimeout = null;
// //       this.rippleElement.classList.remove('ripple-deactivation');
// //     }

// //     if (this.activationTimeout != null) {
// //       clearTimeout(this.activationTimeout);
// //       this.activationTimeout = null;
// //       this.rippleElement.classList.remove('ripple-activation');
// //       window.requestAnimationFrame(this._startActivation);
// //     } else this.startActivation();
    
// //     this.isActive = true;
// //     this.activationTimeout = setTimeout(this.startDeactivation, 225);
// //   }

// //   /**
// //    * @private
// //    */
// //   onTargetElementMouseup() {
// //     this.isActive = false;
// //     if (this.activationTimeout == null && this.requireDeactivation) this.startDeactivation();
// //   }

// //   /**
// //    * @private
// //    */
// //   _forwardRef() {
// //     if (this.refProp == null) return;
// //     if (typeof this.refProp === 'function') this.refProp(this.targetElement);
// //     if (typeof this.refProp === 'object') this.refProp.current = this.targetElement;
// //   }

// //   forwardRef(refProp) {
// //     if (this.refProp === refProp) return;
// //     this.refProp = refProp;
// //     if (this.targetElement === undefined) return;
// //     this._forwardRef();
// //   }

// //   setTargetElement(element) {
    
// //     if (element == null) {
// //       if (this.targetElement != null) {
// //         this.targetElement.classList.remove('ripple-container');
// //         this.targetElement.removeEventListener('mousedown', this.onTargetElementMousedown);
// //         this.targetElement.removeEventListener('mouseup', this.onTargetElementMouseup);
// //         this.targetElement.removeChild(this.rippleElement);
// //       }
// //       this.rippleElement = null;
// //     }

// //     this.targetElement = element;
// //     this._forwardRef();

// //     if (element != null) {
// //       this.rippleElement = document.createElement('span');
// //       this.rippleElement.classList.add('ripple-effect');
// //       this.targetElement.insertBefore(this.rippleElement, this.targetElement.firstChild);
// //       this.targetElement.addEventListener('mousedown', this.onTargetElementMousedown);
// //       this.targetElement.addEventListener('mouseup', this.onTargetElementMouseup);
// //       this.targetElement.classList.add('ripple-container');
// //     }
// //   } 
// // }