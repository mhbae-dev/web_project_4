import Popup from "./Popup.js";

class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      //Delete Card

      this.close();
    });
  }
}

export default PopupDelete;
