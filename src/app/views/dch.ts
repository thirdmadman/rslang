/**
 * DOM Creation Helper
 * @param tagName string
 * @param classList Array<string>
 * @param contetnt string
 * @param childs Array<HTMLElement>
 * @returns HTMLElement
 */
export function dch(tagName = 'div', classList = [''], contetnt = '', ...childs: Array<HTMLElement>) {
  const node = document.createElement(tagName);
  if (classList.length > 0) {
    node.classList.add(...classList);
  }
  if (contetnt.length > 0) {
    node.innerHTML = contetnt;
  }
  if (childs.length > 0) {
    childs.forEach((el) => node.append(el));
  }
  return node;
}
