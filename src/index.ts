import './styles';
export { default as IconStore } from './IconStore';
export { default as Icon } from './components/Icon';
export { default as Button } from './components/Button';
export { default as Checkbox } from './components/Checkbox';
export { default as RadioButton } from './components/RadioButton';
export { default as TextField } from './components/TextField';
export { default as IconButton } from './components/IconButton';
export { default as SelectOption } from './components/SelectOption';
export { default as Select } from './components/Select';
export { default as DateField } from './components/DateField';

declare global {
  interface Window {
    mdc: {
      /** Determines whether an input element should be appended to custom elements as a child node for use with form elements. */
      appendInputElement?: boolean,
      /** Determines whether to set the 'checked' value of md-radio element to false if another md-radio element with the same name of the same form element is selected. */
      implicitUncheck?: boolean
    }
  }
}