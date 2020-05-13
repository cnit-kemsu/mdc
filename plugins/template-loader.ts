//import { getOptions } from 'loader-utils';
import path from 'path';

export default function loader(source: string) {
  //const options = getOptions(this);

  //const currentPath = path.resolve(__dirname).replace(/\\/g, '/');
  return `
    import HTMLTemplate from '@plugins/HTMLTemplate';
    const html = ${JSON.stringify(source)};
    const template = new HTMLTemplate(html);
    export default template;
  `;

  // this.addDependency();
  // const newSource = `
  //   import HTMLTemplate from './HTMLTemplate';
  //   const html = ${JSON.stringify(source)};
  //   const template = new HTMLTemplate(html);
  //   export default template;
  // `;

  // this.callback(null, newSource);
}