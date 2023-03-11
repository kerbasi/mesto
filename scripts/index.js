import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import {
  options,
  initialCards,
  userNameSelector,
  userAboutSelector,
  cardsContainerSelector,
  cardTemplateSelector,
  imagePopupSelector,
  profilePopupSelector,
  editButton,
  addCardPopupSelector,
  addButton,
} from "./constants.js";

console.log(profileForm);

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const cardRender = (item) => {
  return new Card(
    { data: item, handleImageClick },
    cardTemplateSelector
  ).generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: cardRender,
  },
  cardsContainerSelector
);

cardSection.renderItems();

const userInfo = new UserInfo(userNameSelector, userAboutSelector);

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const profileFormSubmit = (info) => {
  userInfo.setUserInfo(info);
};

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmit);
profilePopup.setEventListeners();

const addCardFormSubmit = (data) => {
  cardSection.addItem(cardRender({ name: data.title, link: data.data }));
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, addCardFormSubmit);
addCardPopup.setEventListeners();

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

function handleEditButtonClick() {
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidators[profileForm.getAttribute("name")].resetValidation();
  profilePopup.open();
}

function handleAddButtonClick() {
  formValidators[imageForm.getAttribute("name")].resetValidation();
  addCardPopup.open();
}

editButton.addEventListener("click", handleEditButtonClick);

addButton.addEventListener("click", handleAddButtonClick);
