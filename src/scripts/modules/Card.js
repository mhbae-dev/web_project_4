//Card class
class Card {
  constructor(data, elementSelector, handleCardClick, handleDeleteButton) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
  }

  id() {
    return this._id;
  }
  _getCardTemplate() {
    const elementsTemplate = document.querySelector(this._elementSelector)
      .content;
    return elementsTemplate;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("elements__like_active");
    
  }

  // _handleDeleteButton() {
  //   this._card.remove();
  // }

  _setEventListeners() {
    const elementsImage = this._card.querySelector(".elements__image");
    const elementsLikeButton = this._card.querySelector(".elements__like");
    const elementsDeleteButton = this._card.querySelector(".elements__trash");

    //handling the like event
    elementsLikeButton.addEventListener("click", (event) =>
      this._handleLikeButton(event)
    );

    //handling delete event
    elementsDeleteButton.addEventListener("click", () =>
      this._handleDeleteButton(this.id())
    );

    //handling image popup
    elementsImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._card = this._getCardTemplate()
      .querySelector(".elements__item")
      .cloneNode(true);
    const elementsImage = this._card.querySelector(".elements__image");
    const elementsTitle = this._card.querySelector(".elements__title");

    //information for the created element
    elementsTitle.textContent = this._name;
    elementsImage.style.backgroundImage = `url(${this._link})`;
    elementsImage.alt = `Picture of ${this._name}`;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
