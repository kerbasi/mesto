const inputTitle = profileForm.querySelector(".popup__input_type_title");

const showInputError = (inputElement, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_visible");
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_visible");
  errorElement.textContent = "";
};

const isValid = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement);
  } else {
    hideInputError(inputElement, formElement);
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((input) => {
    console.log(input.validity, input.validity.valid);
    return !input.validity.valid;
  });
};

const disableButton = (buttonElement) => {
  buttonElement.setAttribute("disabled", "");
  buttonElement.classList.add("popup__button_disabled");
};

const enableButton = (buttonElement) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove("popup__button_disabled");
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInputs(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(input, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
};

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((form) => {
    setEventListeners(form);
  });
};

enableValidation();
