export default function customElement(tagName: string) {
  return (constructor: CustomElementConstructor) => {
    customElements.define(tagName, constructor);
  }
}
