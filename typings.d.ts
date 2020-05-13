declare type HTMLTemplate = {
  readonly clonedContent: Node;
}

// declare module '!template!*' {
//   const content: HTMLTemplate;
//   export default content;
// }
declare module '*?template' {
  const content: HTMLTemplate;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}