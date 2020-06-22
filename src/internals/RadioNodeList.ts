import RadioButton from '../components/RadioButton';

export class _RadioNodeList {

  private _current: RadioButton = null;
  private _count: number = 0;
  private formNodeList: FormNodeList;
  private name: string;

  constructor(formGroup: FormNodeList, name: string) {
    this.formNodeList = formGroup;
    this.name = name;
  }

  join(radioButton: RadioButton) {
    this._count++;
    if (radioButton.checked) this.current = radioButton;
  }
  leave(radioButton: RadioButton) {
    this._count--;
    if (this._count === 0) this.formNodeList.delete(this.name);
    else if (this._current === radioButton) this._current = null;
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

type FormNodeList = Map<string, _RadioNodeList>;

const allFormNodeLists: WeakMap<HTMLFormElement | Object, FormNodeList> = new WeakMap();
const dummyForm = {};

export function joinRadioNodeList(radioButton: RadioButton): _RadioNodeList {

  const form = radioButton['inputEl']?.form || dummyForm;
  let formNodeList = allFormNodeLists.get(form);
  if (formNodeList === undefined) {
    formNodeList = new Map();
    allFormNodeLists.set(form, formNodeList);
  }

  const { name } = radioButton;
  let radioNodeList = formNodeList.get(name);
  if (radioNodeList === undefined) {
    radioNodeList = new _RadioNodeList(formNodeList, name);
    formNodeList.set(name, radioNodeList);
  }
  
  radioNodeList.join(radioButton);
  return radioNodeList;
}