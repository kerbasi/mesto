﻿import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  options,
  initialCards,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  cardsContainerSelector,
  cardTemplateSelector,
  imagePopupSelector,
  profilePopupSelector,
  editButton,
  addCardPopupSelector,
  addButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "1d6e2ff2-9c18-4685-a3c5-e532faea5955",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  userNameSelector,
  userAboutSelector,
  userAvatarSelector
);

api
  .getUserInfo()
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  })
  .then((user) => {
    userInfo.setUserInfo({ title: user.name, data: user.about });
    userInfo.setAvatar(user.avatar);
  })
  .catch((err) => console.log(err));

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const createCard = (item) => {
  return new Card(
    { data: item, handleImageClick },
    cardTemplateSelector
  ).generateCard();
};

const cardSection = new Section(cardsContainerSelector);

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  })
  .then((cards) =>
    cards.forEach((card) => cardSection.addItem(createCard(card)))
  )
  .catch((err) => console.log(err));

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
