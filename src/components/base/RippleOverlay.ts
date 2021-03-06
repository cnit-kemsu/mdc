import customElement from '@internals/customElement';
import Overlay from './Overlay';
import template from './RippleOverlay.html';

@customElement('m-ripple-overlay')
export default class RippleOverlay extends Overlay {
  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);
  };
}