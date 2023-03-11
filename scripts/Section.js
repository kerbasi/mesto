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
      renderList.push(renderer(item));
    });
    this.addItem(renderedList);
  }
}

export default Section;
