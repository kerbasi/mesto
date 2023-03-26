class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems(renderedItems) {
    renderedItems.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}

export default Section;
