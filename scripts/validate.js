const inputTitle = profileForm.querySelector(".popup__input_type_title");

const showInputError = (
  inputElement,
  formElement,
  inputErrorClass,
  validationMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
};

const hideInputError = (inputElement, formElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const isValid = (inputElement, formElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    const validationMessage = inputElement.validationMessage;
    showInputError(
      inputElement,
      formElement,
      inputErrorClass,
      validationMessage
    );
  } else {
    hideInputError(inputElement, formElement, inputErrorClass);
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.setAttribute("disabled", "");
  buttonElement.classList.add(inactiveButtonClass);
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInputs(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
};

const setEventListeners = (
  formElement,
  { submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass }
) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  formElement.addEventListener("submit", () => {
    disableButton(buttonElement, inactiveButtonClass);
  });

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(input, formElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
});
