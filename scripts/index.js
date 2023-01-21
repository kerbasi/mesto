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
const popup = document.querySelector(".popup");
const saveButton = popup.querySelector(".popup__button");
const quitButton = popup.querySelector(".popup__cross");
const form = document.querySelector(".popup__form");
const formName = form.querySelector(".popup__input_type_name");
const formAbout = form.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");
const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#card-template");

function openForm() {
  popup.classList.add("popup_opened");
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
}

function closeForm() {
  popup.classList.remove("popup_opened");
}

function saveForm(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileAbout.textContent = formAbout.value;
  closeForm();
}

function heartToggler(event) {
  if (Array.from(event.target.classList).includes("element__heart-image")) {
    event.target.classList.toggle("element__heart-image_active");
  }
}

function renderElement(name = "", link = "") {
  const element = elementTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const elementTitle = element.querySelector(".element__title");
  const elementImage = element.querySelector(".element__image");
  elementTitle.textContent = name;
  elementImage.style.background = `url(${link}) center / cover`;
  elements.append(element);
}

function renderElements(cards) {
  cards.forEach((card) => {
    renderElement(card.name, card.link);
  });
}

editButton.addEventListener("click", openForm);

quitButton.addEventListener("click", closeForm);

form.addEventListener("submit", saveForm);

elements.addEventListener("click", heartToggler);

renderElements(initialCards);
