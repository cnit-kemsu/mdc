declare interface HTMLTemplate {
  readonly fragment: Node;
}

declare module '*.html' {
  const content: HTMLTemplate;
  export default content;
}