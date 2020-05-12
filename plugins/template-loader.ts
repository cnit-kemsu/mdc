//import { getOptions } from 'loader-utils';
import path from 'path';

export default function loader(source: string) {
  //const options = getOptions(this);

  const currentPath = path.resolve(__dirname).replace(/\\/g, '/');
  return `
    import HTMLTemplate from '${currentPath}/HTMLTemplate';
    const html = ${JSON.stringify(source)};
    const template = new HTMLTemplate(html);
    export default template;
  `;
}