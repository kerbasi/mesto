import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
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
  deleteCardPopupSelector,
  avatarPopupSelector,
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
    userInfo.setUserId(user._id);
  })
  .catch((err) => console.log(err));

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const handleTrashClick = (_id, elem) => {
  deleteCardPopup.open(_id, elem);
};

const handleLikeClick = (
  _id,
  isLiked,
  addLike,
  removeLike,
  setLikesCounter
) => {
  if (isLiked) {
    api
      .removeLike(_id)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((data) => {
        setLikesCounter(data);
        removeLike();
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(_id)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((data) => {
        setLikesCounter(data);
        addLike();
      })
      .catch((err) => console.log(err));
  }
};

const createCard = (data) => {
  const userId = userInfo.getUserId();
  return new Card(
    { data, userId, handleImageClick, handleTrashClick, handleLikeClick },
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
    cards.reverse().forEach((card) => cardSection.addItem(createCard(card)))
  )
  .catch((err) => console.log(err));

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const profileFormSubmit = (info) => {
  api
    .setUserInfo(info)
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((user) => {
      userInfo.setUserInfo({ title: user.name, data: user.about });
    })
    .catch((err) => console.log(err));
};

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmit);
profilePopup.setEventListeners();

const addCardFormSubmit = (data) => {
  api
    .setCard({ name: data.title, link: data.data })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((card) => {
      cardSection.addItem(createCard(card));
    })
    .catch((err) => console.log(err));
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, addCardFormSubmit);
addCardPopup.setEventListeners();

const deleteCardFormSubmit = (_id, elem) => {
  api
    .deleteCard(_id)
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then(() => {
      elem.remove();
    })
    .catch((err) => console.log(err));
};

const deleteCardPopup = new PopupWithSubmit(
  deleteCardPopupSelector,
  deleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

const avatarFormSubmit = () => {};

const avatarPopup = new PopupWithForm(avatarPopupSelector, avatarFormSubmit);
avatarPopup.setEventListeners();
avatarPopup.open();

const formValidators = {};

const enableValidation = (options, formValidators) => {
  const formList = document.querySelectorAll(options.formSelector);

  Array.from(formList)
    .filter((form) => form.name !== "deleteForm")
    .forEach((form) => {
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
