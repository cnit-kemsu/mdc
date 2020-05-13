//import { getOptions } from 'loader-utils';
import path from 'path';

export default function loader(source: string) {
  //const options = getOptions(this);

  return `
    import HTMLTemplate from '@plugins/HTMLTemplate';
    const html = ${JSON.stringify(source)};
    const template = new HTMLTemplate(html);
    export default template;
  `;
}