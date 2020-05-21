import RadioButton from '@components/RadioButton';

export class RadioGroup {

  private _current: RadioButton = null;
  private _count: number = 0;
  private formGroup: FormGroup;
  private name: string;

  constructor(formGroup: FormGroup, name: string) {
    this.formGroup = formGroup;
    this.name = name;
  }

  join() {
    this._count++;
  }
  leave() {
    this._count--;
    if (this._count === 0) this.formGroup.delete(this.name)
  }
  
  get current(): RadioButton {
    return this._current;
  }
  set current(value: RadioButton) {
    const { _current } = this;
    if (_current === value) return;
    this._current = value;
    if (_current !== null) _current.checked = false;
  }
}

export type FormGroup = Map<string, RadioGroup>;

const allFormGroups: WeakMap<HTMLFormElement, FormGroup> = new WeakMap();
const dummyForm = <HTMLFormElement>{};

export function joinFormGroup(inputEl: HTMLInputElement): FormGroup {

  const form = inputEl.form || dummyForm;
  let formGroup = allFormGroups.get(form);
  if (formGroup === undefined) {
    formGroup = new Map();
    allFormGroups.set(form, formGroup);
  }
  return formGroup;
}

export function joinRadioGroup(radioButton: RadioButton): RadioGroup {
  // @ts-expect-error: 
  const { formGroup, name } = radioButton;
  
  let radioGroup = formGroup.get(name);
  if (radioGroup === undefined) {
    radioGroup = new RadioGroup(formGroup, name);
    formGroup.set(name, radioGroup);
  }
  radioGroup.join();
  if (radioButton.checked) radioGroup.current = radioButton;
  return radioGroup;
}