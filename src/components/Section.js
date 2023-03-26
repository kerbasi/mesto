class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
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
