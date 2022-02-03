class App {
  private rootNode = document.body;

  constructor() {
    this.rootNode = document.getElementsByClassName('app')[0] as HTMLElement;
    if (!this.rootNode) {
      this.rootNode = document.createElement('div');
      this.rootNode.classList.add('app');
    }
    document.body.append(this.rootNode);
  }

  run() {
    this.rootNode.innerText = 'App is running';
    console.log('App is running');
  }
}
export default App;
