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
    this.focusableEl.tabIndex = this.disabled ? -1 : 0;
  }
  static get observedAttributes() {
    return ['disabled'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'disabled':
        if (newValue === 'false') this.removeAttribute('disabled');
        else this.focusableEl.tabIndex = newValue === null ? 0 : -1;
        break;
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

declare global {
  module MDC {
    interface FormEvent<T> extends React.FormEvent<T> {
      target: T & EventTarget;
    }
    interface InteractiveElementProps<T> extends React.HTMLAttributes<T> {
      disabled?: boolean;
    }
  }
}