export default class HTMLTemplate {
  
  private templateEl: HTMLTemplateElement;

  constructor(html: string) {
    this.templateEl = document.createElement('template');
    this.templateEl.innerHTML = html;
  }

  get fragment(): Node {
    return this.templateEl.content.cloneNode(true);
  }
}

declare module '*.html' {
  const content: HTMLTemplate;
}

declare module '*.svg' {
  const content: HTMLTemplate;
}