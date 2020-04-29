import SelectionControl from '@components/base/SelectionControl';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);


export default class Checkbox extends SelectionControl {

  private setPathStyleProp: (propertyName: string, value: string) => void;

  constructor() {
    super(template.clonedContent);

    const path: HTMLElement = this.shadowRoot.querySelector('#path');
    const pathStyle = path.style;
    this.setPathStyleProp = pathStyle.setProperty.bind(pathStyle);
  }

  onChange() {
    this.checked = !this.checked;
    
    if (this.checked) this.setPathStyleProp('--md-path-animation', 'var(--md-path-check)');
    else this.setPathStyleProp('--md-path-animation', 'var(--md-path-uncheck)');

    super.onChange();
  }
}