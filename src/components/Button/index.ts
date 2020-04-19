import InteractiveElement from '@components/InteractiveElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

export default class Button extends InteractiveElement {

  constructor() {
    super(template.clonedContent);
  }
}