class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
  }

  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      const validationMessage = inputElement.validationMessage;
      this._showInputError(inputElement, validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInputs() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.setAttribute("disabled", "");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInputs()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._formElement.addEventListener("submit", () => {
      this._disableButton();
    });

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
