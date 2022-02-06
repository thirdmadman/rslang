export class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', classList = '', content = '') {
    const el = document.createElement(tagName);
    el.classList.add(classList);
    el.textContent = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}
