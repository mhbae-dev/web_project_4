class Section {
  constructor({ items, renderer }, elementsContainer) {
    this._itemArray = items;
    this._renderer = renderer;
    this._cardContainer = elementsContainer;
  }

  renderer() {
    this._itemArray.forEach((input) => {
      this._renderer(input);
    });
  }

  addItem(card) {
    this._cardContainer.prepend(card);
  }
}

export default Section;
