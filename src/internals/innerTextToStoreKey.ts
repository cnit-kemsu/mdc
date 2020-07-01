const mutationObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true
};

const textNodeDataChangeCallback = function (mutationsList: MutationRecord[]) {
  for (const { type, target } of mutationsList) {
    if (type === 'characterData') {
      target.parentNode['storeKey'] = target['data'];
    }
  }
};

const observer = new MutationObserver(textNodeDataChangeCallback);

const onlyEmptyCharacters = /^[\s↵]*$/;
function excludeEmptyTextNode(node: Node) {
  if (node instanceof Text) return !onlyEmptyCharacters.test(node.data);
  return true;
}

function handleSlotChange(element: HTMLElement) {
  const nodes = [...element.childNodes].filter(excludeEmptyTextNode);
  console.log(nodes);
  let firstNode = nodes[0] || null;

  if (firstNode === null) {
    element['storeKey'] = '';
    return;
  }
  if (nodes.length > 1 || !(firstNode instanceof Text)) throw new TypeError(`An instance of ${element.constructor.name} can contain only one child node, and it must be an instance of Text.`);

  element['storeKey']  = firstNode.data;
  observer.observe(firstNode, mutationObserverConfig);
}

export default function innerTextToStoreKey(element: HTMLElement) {
  const slotEl: HTMLSlotElement = element.shadowRoot.querySelector('slot');
  slotEl.addEventListener('slotchange', handleSlotChange.bind(null, element));
}