import { HTMLTemplate } from './';

export default class IconStore {
  private static icons = new Map();

  static get(key: string): HTMLTemplate {
    return IconStore.icons.get(key);
  };
  static set(key: string, html: string) {
    IconStore.icons.set(key, new HTMLTemplate(html));
  };
}