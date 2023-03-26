import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    const inputsData = {};
    this._inputList.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setSubmitButtonText(isStarted) {
    if (isStarted) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
