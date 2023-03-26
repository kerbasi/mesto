import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__button");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(...this._args);
    });
    super.setEventListeners();
  }

  setSubmitButtonText(isStarted) {
    if (isStarted) {
      this._button.textContent = "Удаление...";
    } else {
      this._button.textContent = "Да";
    }
  }

  open(...args) {
    super.open();
    this._args = [...args];
  }
}

export default PopupWithSubmit;
