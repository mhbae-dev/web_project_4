class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //close popup on escape
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(event) {
    const closeButton = this._popupElement.querySelector(".popup__close-btn");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_active")) {
        this.close();
      }
    });
  }
}

export default Popup;
