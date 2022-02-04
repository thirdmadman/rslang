class Renderable {
  protected rootNode: HTMLElement = document.createElement('div');

  getElement() {
    return this.rootNode;
  }
}

export default Renderable;
