//Imports
import { togglePopup, escapePopup, closeClick } from "./utils.js";

//Variables
const popupImage = document.querySelector(".popup_type_image");
const image = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__image-title");

//Card class
class Card {
  constructor(data, elementSelector) {
    this._link = data.link;
    this._name = data.name;
    this._elementSelector = elementSelector;
  }

  _getCardTemplate() {
    const elementsTemplate = document.querySelector(this._elementSelector)
      .content;
    return elementsTemplate;
  }

  _handleLikeButton() {
    event.target.classList.toggle("elements__like_active");
  }

  _handleDeleteButton() {
    this._card.remove();
  }

  _handleImagePopup() {
    image.src = this._link;
    image.alt = `Picture of ${this._name}`;
    imageCaption.textContent = this._name;
    togglePopup(popupImage);
  }

  _setEventListeners() {
    const elementsImage = this._card.querySelector(".elements__image");
    const elementsLikeButton = this._card.querySelector(".elements__like");
    const elementsDeleteButton = this._card.querySelector(".elements__trash");

    //handling the like event
    elementsLikeButton.addEventListener("click", (event) =>
      this._handleLikeButton()
    );

    //handling delete event
    elementsDeleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );

    //handling image popup
    elementsImage.addEventListener("click", () => this._handleImagePopup());
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
