import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";

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
} from "../utils/constants.js";

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const createCard = (item) => {
  return new Card(
    { data: item, handleImageClick },
    cardTemplateSelector
  ).generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
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
  cardSection.addItem(createCard({ name: data.title, link: data.data }));
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
