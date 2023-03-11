import initialCards from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const options = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  formSelector: ".popup__form",
};

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");
const profilePopup = document.querySelector(".popup_type_person");
const profileForm = profilePopup.querySelector(".popup__form");
const profilePopupName = profilePopup.querySelector(".popup__input_type_title");
const profilePopupAbout = profilePopup.querySelector(".popup__input_type_data");
const popups = document.querySelectorAll(".popup");
const addImagePopup = document.querySelector(".popup_type_add-image");
const addImageForm = addImagePopup.querySelector(".popup__form");
const addImagePopupTitle = addImagePopup.querySelector(
  ".popup__input_type_title"
);
const addImagePopupUrl = addImagePopup.querySelector(".popup__input_type_data");

const elements = document.querySelector(".elements");

const formValidators = {};

const enableValidation = (options, formValidators) => {
  const formList = document.querySelectorAll(options.formSelector);

  formList.forEach((form) => {
    const validation = new FormValidator(options, form);

    formValidators[form.getAttribute("name")] = validation;

    validation.enableValidation(options);
  });
};

enableValidation(options, formValidators);

function handleEscPress(evt) {
  if (evt.key === `Escape`) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(element) {
  document.addEventListener("keydown", handleEscPress);
  element.classList.add("popup_opened");
}

function closePopup(element) {
  document.removeEventListener("keydown", handleEscPress);
  element.classList.remove("popup_opened");
}

function handleEditButtonClick() {
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;

  formValidators[profileForm.getAttribute("name")].resetValidation();
  openPopup(profilePopup);
}

function handleAddButtonClick() {
  formValidators[addImageForm.getAttribute("name")].resetValidation();
  openPopup(addImagePopup);
}

function handleEditButtonSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
}

function createCard(item) {
  const cardElement = new Card(
    item,
    "#element-template",
    openPopup
  ).generateCard();
  return cardElement;
}

function renderInitialElements(cardsData) {
  elements.append(
    ...cardsData.map((cardData) => {
      return createCard(cardData);
    })
  );
}

function handleAddButtonSubmit(evt) {
  evt.preventDefault();
  elements.prepend(
    createCard({ name: addImagePopupTitle.value, link: addImagePopupUrl.value })
  );
  evt.target.reset();
  closePopup(addImagePopup);
}

editButton.addEventListener("click", handleEditButtonClick);

profileForm.addEventListener("submit", handleEditButtonSubmit);

addButton.addEventListener("click", handleAddButtonClick);

addImageForm.addEventListener("submit", handleAddButtonSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__cross-image")) {
      closePopup(popup);
    }
  });
});

renderInitialElements(initialCards);
