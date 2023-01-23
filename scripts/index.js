const initialCards = [
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

const page = document.querySelector(".page");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");
const personPopup = document.querySelector(".popup_type_person");
const personForm = personPopup.querySelector(".popup__form");
const personPopupName = personPopup.querySelector(".popup__input_type_title");
const personPopupAbout = personPopup.querySelector(".popup__input_type_data");
const popupCloseButtons = document.querySelectorAll(".popup__cross-image");
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
const elementTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");

function handleImageClick(event) {
  const title = event.target
    .closest(".element")
    .querySelector(".element__title").textContent;
  imagePopupImg.setAttribute("src", event.target.getAttribute("src"));
  imagePopupImg.setAttribute("alt", `увеличенное изображение ${title}`);
  imagePopupTitle.textContent = title;
  openPopup(imagePopup);
}

function handleTrashImageClick(event) {
  event.target.closest(".element").remove();
}

function handleLikeImageClick(event) {
  event.target.classList.toggle("element__heart-image_active");
}

function createElement(name = "", link = "") {
  const element = elementTemplate.cloneNode(true);
  const elementTitle = element.querySelector(".element__title");
  const elementImage = element.querySelector(".element__image");
  const elementTrashImage = element.querySelector(".element__trash-image");
  const elementLikeImage = element.querySelector(".element__heart-image");

  elementTitle.textContent = name;
  elementImage.setAttribute("src", link);
  elementImage.setAttribute("alt", `изображение ${name}`);

  elementImage.addEventListener("click", handleImageClick);
  elementTrashImage.addEventListener("click", handleTrashImageClick);
  elementLikeImage.addEventListener("click", handleLikeImageClick);
  return element;
}

function renderInitialElements(cards) {
  cards.forEach((card) => {
    elements.append(createElement(card.name, card.link));
  });
}

function openPopup(element) {
  element.classList.add("popup_opened");
}

function closePopup(element) {
  element.classList.remove("popup_opened");
}

function handleEditButtonClick() {
  if (!personPopupName.value) {
    personPopupName.value = profileName.textContent;
  }
  if (!personPopupAbout.value) {
    personPopupAbout.value = profileAbout.textContent;
  }
  openPopup(personPopup);
}

function handleEditButtonSubmit(event) {
  event.preventDefault();
  profileName.textContent = personPopupName.value;
  profileAbout.textContent = personPopupAbout.value;
  event.target.reset();
  closePopup(personPopup);
}

function handleAddButtonClick() {
  openPopup(addImagePopup);
}

function handleAddButtonSubmit(event) {
  event.preventDefault();
  elements.prepend(
    createElement(addImagePopupTitle.value, addImagePopupUrl.value)
  );
  event.target.reset();
  closePopup(addImagePopup);
}

editButton.addEventListener("click", () => {
  openPopup(personPopup);
});

editButton.addEventListener("click", handleEditButtonClick);

personForm.addEventListener("submit", handleEditButtonSubmit);

addButton.addEventListener("click", handleAddButtonClick);

addImageForm.addEventListener("submit", handleAddButtonSubmit);

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

renderInitialElements(initialCards);
