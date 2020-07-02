import customElement from '../internals/customElement';
import IconStore from '../IconStore';
import innerTextToStoreKey from '@internals/innerTextToStoreKey';
import template from './Icon.html';

@customElement('md-icon')
export default class Icon extends HTMLElement {

  private _storeKey: string = '';
  private svgEl: SVGElement = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);

    innerTextToStoreKey(this);
  }

  get storeKey(): string {
    return this._storeKey;
  }
  set storeKey(value: string) {
    this._storeKey = value || '';

    let svgEl = this.svgEl;
    if (svgEl !== null) this.shadowRoot.removeChild(svgEl);

    const template = IconStore.get(value);
    svgEl = template?.fragment.firstChild as SVGElement || null;
    if (svgEl !== null) this.shadowRoot.appendChild(svgEl);
    this.svgEl = svgEl;
  }
}

interface IconProps extends React.HTMLAttributes<IconProps> {
  children?: string;
}
declare global {
  module JSX {
    interface IntrinsicElements {
      'md-icon': IconProps;
    }
  }
}
