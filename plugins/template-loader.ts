//import { getOptions } from 'loader-utils';
import path from 'path';

export default function loader(source: string, ...args) {
  //const options = getOptions(this);

  console.log('111');
  console.log(args);
  console.log('222');
  console.log(source);

  const currentPath = path.resolve(__dirname).replace(/\\/g, '/');
  return `
    import HTMLTemplate from '${currentPath}/HTMLTemplate';
    const html = ${JSON.stringify(source)};
    const template = new HTMLTemplate(html);
    export default template;
  `;
}