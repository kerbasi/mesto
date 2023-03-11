export const options = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  formSelector: ".popup__form",
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__info-title");
export const profileAbout = document.querySelector(".profile__info-subtitle");
export const profilePopup = document.querySelector(".popup_type_person");
export const profileForm = profilePopup.querySelector(".popup__form");
export const profilePopupName = profilePopup.querySelector(
  ".popup__input_type_title"
);
export const profilePopupAbout = profilePopup.querySelector(
  ".popup__input_type_data"
);
export const popups = document.querySelectorAll(".popup");
export const addImagePopup = document.querySelector(".popup_type_add-image");
export const addImageForm = addImagePopup.querySelector(".popup__form");
export const addImagePopupTitle = addImagePopup.querySelector(
  ".popup__input_type_title"
);
export const addImagePopupUrl = addImagePopup.querySelector(
  ".popup__input_type_data"
);

export const elements = document.querySelector(".elements");
