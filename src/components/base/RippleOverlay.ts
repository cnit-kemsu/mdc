import Overlay from './Overlay';
import template from './RippleOverlay.html?template';

export default class RippleOverlay extends Overlay {

  constructor() {
    super();
    
    this.shadowRoot.appendChild(template.clonedContent);
  };
}