import HTMLTemplate from './internals/HTMLTemplate';

export default class IconStore {
  private static icons = new Map();

  static get(key: string): HTMLTemplate {
    return IconStore.icons.get(key);
  };
  static set(key: string, template: HTMLTemplate | string) {
    const _template = typeof template === 'string' ? new HTMLTemplate(template) : template;
    IconStore.icons.set(key, _template);
  };
}