import customElement from '../internals/customElement';
import InteractiveElement from './base/InteractiveElement';
import RippleEffect from './base/RippleEffect';
import Icon from './Icon';
import innerTextToStoreKey from '@internals/innerTextToStoreKey';
import template from './IconButton.html';

@customElement('m-icon-button')
export default class IconButton extends InteractiveElement {
  
  private iconEl : Icon;

  constructor() {
    super();
    new RippleEffect(this);
    this.shadowRoot.appendChild(template.fragment);
    this.iconEl = this.shadowRoot.querySelector('m-icon');

    innerTextToStoreKey(this);
  }

  get storeKey(): string {
    return this.iconEl.storeKey;
  }
  set storeKey(value: string) {
    this.iconEl.storeKey = value;
  }
}

declare global {
  module Material {
    interface IconButtonProps extends InteractiveElementProps<IconButton> {
      children?: string;
    }
  }
  module JSX {
    interface IntrinsicElements {
      'm-icon-button': Material.IconButtonProps;
    }
  }
}