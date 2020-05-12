declare module '*.html' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}

declare type HTMLTemplate = {
  readonly clonedContent: Node;
}
declare module '*.tmpl' {
  const content: HTMLTemplate;
  export default content;
}