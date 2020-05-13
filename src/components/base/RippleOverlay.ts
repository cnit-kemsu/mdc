import { customElement } from '@lib';
import Overlay from './Overlay';
import template from './RippleOverlay.html?template';

@customElement('md-ripple-overlay')
export default class RippleOverlay extends Overlay {

  constructor() {
    super();
    
    this.shadowRoot.appendChild(template.clonedContent);
  };
}