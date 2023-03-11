import initialCards from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { options, initialCards } from "./constants.js";

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
