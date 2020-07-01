import customElement from '../internals/customElement';
import IconStore from '../IconStore';
import innerTextToStoreKey from '@internals/innerTextToStoreKey';
import template from './Icon.html';

// const mutationObserverConfig = { childList: true, subtree: true, characterData: true };
// const textNodeDataChangeCallback = function (mutationsList: MutationRecord[]) {
//   for (const { type, target } of mutationsList) {
//     if (type === 'characterData') {
//       target.parentNode['storeKey'] = target['data'];
//     }
//   }
// };
// const observer = new MutationObserver(textNodeDataChangeCallback);

// const onlyEmptyCharacters = /^[\s↵]*$/;
// function excludeEmptyTextNode(node: Node) {
//   if (node instanceof Text) return !onlyEmptyCharacters.test(node.data);
//   return true;
// }

@customElement('md-icon')
export default class Icon extends HTMLElement {

  private _storeKey: string = '';
  private svgEl: SVGElement = null;

  constructor() {
    super();

    //this.handleSlotChange = this.handleSlotChange.bind(this);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);

    innerTextToStoreKey(this);
    //const slotEl: HTMLSlotElement = this.shadowRoot.querySelector('slot');
    //slotEl.addEventListener('slotchange', this.handleSlotChange);
  }

  // handleSlotChange() {
  //   const nodes = [...this.childNodes].filter(excludeEmptyTextNode);
  //   let firstNode = nodes[0] || null;

  //   if (firstNode === null) {
  //     this.storeKey = '';
  //     return;
  //   }
  //   if (nodes.length > 1 || !(firstNode instanceof Text)) throw new TypeError(`An instance of Icon can contain only one child node, and it must be an instance of Text.`);

  //   this.storeKey  = firstNode.data;
  //   observer.observe(firstNode, mutationObserverConfig);
  // }

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

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  children?: string;
}
declare global {
  module JSX {
    interface IntrinsicElements {
      'md-icon': IconProps;
    }
  }
}
