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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");
const personPopup = document.querySelector(".popup_type_person");
const imagePopup = document.querySelector(".popup_type_image");
const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#card-template");
const popupTemplate = document.querySelector("#popup-template");
const popups = document.querySelectorAll(".popup");

function createElement(name = "", link = "") {
  const element = elementTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const elementTitle = element.querySelector(".element__title");
  const elementImage = element.querySelector(".element__image");
  elementTitle.textContent = name;
  elementImage.style.background = `url(${link}) center / cover`;
  return element;
}

function renderInitialElements(cards) {
  cards.forEach((card) => {
    elements.append(createElement(card.name, card.link));
  });
}

function openForm(element) {
  const formTitle = element.querySelector(".popup__input_type_title");
  const formData = element.querySelector(".popup__input_type_data");
  element.classList.add("popup_opened");
  if (Array.from(element.classList).includes("popup_type_person")) {
    formTitle.value = profileName.textContent;
    formData.value = profileAbout.textContent;
  } else {
    formTitle.value = "";
    formData.value = "";
    formTitle.placeholder = "Название";
    formData.placeholder = "Ссылка на картинку";
  }
}

function closeForm(event) {
  let element;
  if (Array.from(event.target.classList).includes("popup__form")) {
    element = event.target.parentNode.parentNode;
  } else {
    element = event.target.parentNode.parentNode.parentNode;
  }
  element.classList.remove("popup_opened");
}

function saveForm(event) {
  event.preventDefault();
  const element = event.target.parentNode.parentNode;
  const formTitle = element.querySelector(".popup__input_type_title");
  const formData = element.querySelector(".popup__input_type_data");
  if (Array.from(element.classList).includes("popup_type_person")) {
    profileName.textContent = formTitle.value;
    profileAbout.textContent = formData.value;
  } else {
    elements.prepend(createElement(formTitle.value, formData.value));
  }
  closeForm(event);
}

function handleHeartClick(event) {
  if (Array.from(event.target.classList).includes("element__heart-image")) {
    event.target.classList.toggle("element__heart-image_active");
  }
}

Array.from(popups).forEach((popup) => {
  const form = popup.querySelector(".popup__form");
  const quitButton = popup.querySelector(".popup__cross");
  quitButton.addEventListener("click", closeForm);
  form.addEventListener("submit", saveForm);
});

editButton.addEventListener("click", () => {
  openForm(personPopup);
});

addButton.addEventListener("click", () => {
  openForm(imagePopup);
});

elements.addEventListener("click", handleHeartClick);

renderInitialElements(initialCards);
