import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__image");
    this._imageCaption = this._popupElement.querySelector(
      ".popup__image-title"
    );
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = `Picture of ${name}`;
    this._imageCaption.textContent = name;
  }
}

export default PopupWithImage;
