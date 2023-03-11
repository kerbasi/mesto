class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.append(item);
  }

  renderItems() {
    const renderedList = [];
    this._renderedItems.forEach((item) => {
      // renderedList.push(this._renderer(item));
      this.addItem(this._renderer(item));
    });
  }
}

export default Section;
