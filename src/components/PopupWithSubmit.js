import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(...this._args);
      this.close();
    });
    super.setEventListeners();
  }

  open(...args) {
    super.open();
    this._args = [...args];
  }
}

export default PopupWithSubmit;
