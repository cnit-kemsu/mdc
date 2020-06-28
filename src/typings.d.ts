// declare class HTMLTemplate {
//   readonly fragment: Node;
// }

declare type HTMLTemplate = import('./internals/HTMLTemplate').default;

declare module '*.html' {
  //const content: HTMLTemplate;
  const content: HTMLTemplate;
  export default content;
}

declare module '*.svg' {
  //const content: HTMLTemplate;
  const content: HTMLTemplate;
  export default content;
}