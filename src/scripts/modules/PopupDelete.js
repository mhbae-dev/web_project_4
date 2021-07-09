import Popup from "./Popup.js";

class PopupDelete extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  handleDelete() {
    this._cardItem.remove();
  }

  open(cardID, cardItem) {
    super.open();
    this._data = cardID;
    this._cardItem = cardItem;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler(this._data);
      this.close();
    });
  }
}

export default PopupDelete;
