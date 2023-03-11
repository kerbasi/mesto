class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}

export default Section;
