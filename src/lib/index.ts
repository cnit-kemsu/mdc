export { default as customElement } from './customElement';
export { default as HTMLTemplate } from './HTMLTemplate';
export { default as IconStore } from './IconStore';

window.mdc = {
  options: {
    useInputElement: true,
    autoUncheck: true
  }
};

declare global {
  interface Window {
    mdc: {
      options: {
        /** Determines whether an input element should be appended to custom elements as a child node for use with form elements. */
        useInputElement: boolean,
        /** Determines whether to set the 'checked' value of md-radio element to false if another md-radio element with the same name of the same form element is selected. */
        autoUncheck: boolean
      };
    };
  }
}