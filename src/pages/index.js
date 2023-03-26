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
  avatarWrapper,
  profileSubmitButton,
  addImageSubmitButton,
  avatarSubmitButton,
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
        api._getResponseData(res);
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
        api._getResponseData(res);
      })
      .then((data) => {
        setLikesCounter(data);
        addLike();
      })
      .catch((err) => console.log(err));
  }
};

const cardRenderer = (data) => {
  const userId = userInfo.getUserId();
  return new Card(
    { data, userId, handleImageClick, handleTrashClick, handleLikeClick },
    cardTemplateSelector
  ).generateCard();
};

const cardSection = new Section(cardRenderer, cardsContainerSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((responses) => {
    let err = "";
    responses.forEach((res) => {
      if (!res.ok) {
        err = res;
      }
    });
    if (err) return Promise.reject(`Ошибка: ${err.status}`);
    return Promise.all(responses.map((response) => response.json()));
  })
  .then((data) => {
    userInfo.setUserInfo({ title: data[0].name, data: data[0].about });
    userInfo.setAvatar(data[0].avatar);
    userInfo.setUserId(data[0]._id);

    cardSection.renderItems(data[1]);
  })
  .catch((err) => console.log(err));

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const profileFormSubmit = (info) => {
  profileSubmitButton.textContent = "Сохранение...";
  api
    .setUserInfo(info)
    .then((res) => {
      api._getResponseData(res);
    })
    .then((user) => {
      userInfo.setUserInfo({ title: user.name, data: user.about });
    })
    .catch((err) => console.log(err))
    .finally(() => (profileSubmitButton.textContent = "Сохранить"));
};

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmit);
profilePopup.setEventListeners();

const addCardFormSubmit = (data) => {
  addImageSubmitButton.textContent = "Сохранение...";
  api
    .setCard({ name: data.title, link: data.data })
    .then((res) => {
      api._getResponseData(res);
    })
    .then((card) => {
      cardSection.addItem(cardRenderer(card));
    })
    .catch((err) => console.log(err))
    .finally(() => (addImageSubmitButton.textContent = "Сохранить"));
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, addCardFormSubmit);
addCardPopup.setEventListeners();

const deleteCardFormSubmit = (_id, elem) => {
  api
    .deleteCard(_id)
    .then((res) => {
      api._getResponseData(res);
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

const avatarFormSubmit = ({ data }) => {
  avatarSubmitButton.textContent = "Сохранение...";
  api
    .editAvatar(data)
    .then((res) => {
      api._getResponseData(res);
    })
    .then((data) => {
      userInfo.setAvatar(data.avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => (avatarSubmitButton.textContent = "Сохранить"));
};

const avatarPopup = new PopupWithForm(avatarPopupSelector, avatarFormSubmit);
avatarPopup.setEventListeners();

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

avatarWrapper.addEventListener("click", () => {
  formValidators[avatarForm.getAttribute("name")].resetValidation();
  avatarPopup.open();
});
