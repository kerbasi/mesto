import Card from "./Card.js";
import initialCards from "./data.js";

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
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__title_type_image");
const elements = document.querySelector(".elements");

function handleImageClick(evt) {
  if (evt.target.classList.contains("element__image")) {
    const title = evt.target
      .closest(".element")
      .querySelector(".element__title").textContent;
    imagePopupImg.setAttribute("src", evt.target.getAttribute("src"));
    imagePopupImg.setAttribute("alt", `увеличенное изображение ${title}`);
    imagePopupTitle.textContent = title;
    openPopup(imagePopup);
  }
}

function renderInitialElements(cardsData) {
  elements.append(
    ...cardsData.map((cardData) => {
      return new Card(cardData, "#element-template").generateCard();
    })
  );
}

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
  const event = new Event("input", {
    bubbles: true,
    cancelable: true,
  });
  profilePopupName.value = profileName.textContent;
  profilePopupName.dispatchEvent(event);
  profilePopupAbout.value = profileAbout.textContent;
  profilePopupAbout.dispatchEvent(event);
  openPopup(profilePopup);
}

function handleEditButtonSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
}

function handleAddButtonClick() {
  openPopup(addImagePopup);
}

function handleAddButtonSubmit(evt) {
  evt.preventDefault();
  elements.prepend(
    new Card(
      { name: addImagePopupTitle.value, link: addImagePopupUrl.value },
      "#element-template"
    ).generateCard()
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

elements.addEventListener("click", handleImageClick);

renderInitialElements(initialCards);
