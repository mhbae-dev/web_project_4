import Popup from "./Popup.js";

class PopupDelete extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  handleDelete(cardElement) {
    cardElement.remove();
  }

  open(cardId, cardItem) {
    super.open();
    this._cardId = cardId;
    this._cardItem = cardItem;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupElement.querySelector(".popup__form");
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler(this._cardId, this._cardItem);
      this.close();
    });
  }
}

export default PopupDelete;
