export class AbstractController {
  protected rootNode: HTMLElement;

  constructor(rootNode: HTMLElement) {
    this.rootNode = rootNode;
  }

  resolve(path: string) {
    if (path) {
      this.rootNode.innerHTML = 'Controller called';
    }
  }
}
