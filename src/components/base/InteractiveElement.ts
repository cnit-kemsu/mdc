import template from './InteractiveElement.html?template';

export default class InteractiveElement extends HTMLElement {

  protected focusableEl: HTMLElement = this;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
    this.addEventListener('keyup', this.handleKeyup);
  }

  connectedCallback() {
    // if (!this.disabled)
    this.focusableEl.tabIndex = 0;
  }
  static get observedAttributes() {
    return ['disabled'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'disabled') {
      if (newValue === 'false') this.removeAttribute('disabled');
      else this.focusableEl.tabIndex = newValue === null ? 0 : -1;
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }
}

export interface InteractiveElementProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
}