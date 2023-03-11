import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__title_type_image");
  }

  open(data) {
    this._image.setAttribute("src", data.link);
    this._image.setAttribute("alt", `увеличенное изображение ${data.name}`);
    this._title.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;
