export default class HTMLTemplate {
  
  templateElement: HTMLTemplateElement;

  constructor(html: string) {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    this.templateElement = templateElement;
  }

  get clonedContent(): Node {
    return this.templateElement.content.cloneNode(true);
  }
}

declare module '*?template' {
  const content: HTMLTemplate;
}