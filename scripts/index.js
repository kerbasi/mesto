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
const personPopup = document.querySelector(".popup_type_person");
const imagePopup = document.querySelector(".popup_type_image");
const saveButton = personPopup.querySelector(".popup__button");
const quitButton = personPopup.querySelector(".popup__cross");
const form = document.querySelector(".popup__form");
// const formName = form.querySelector(".popup__input_type_name");
// const formAbout = form.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");
const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#card-template");

// function openForm() {
//   personPopup.classList.add("popup_opened");
//   formName.value = profileName.textContent;
//   formAbout.value = profileAbout.textContent;
// }

function openForm(element) {
  const formName = element.querySelector(".popup__input_type_name");
  const formAbout = element.querySelector(".popup__input_type_about");
  element.classList.add("popup_opened");
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
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
  const formName = element.querySelector(".popup__input_type_name");
  const formAbout = element.querySelector(".popup__input_type_about");
  if (Array.from(element.classList).includes("popup_type_person")) {
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
  } else {
    elements.prepend(createElement(formName.value, formAbout.value));
  }
  closeForm(event);
}

function heartToggler(event) {
  if (Array.from(event.target.classList).includes("element__heart-image")) {
    event.target.classList.toggle("element__heart-image_active");
  }
}

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

function renderElements(cards) {
  cards.forEach((card) => {
    elements.append(createElement(card.name, card.link));
  });
}

editButton.addEventListener("click", () => {
  openForm(personPopup);
});

quitButton.addEventListener("click", closeForm);

form.addEventListener("submit", saveForm);

elements.addEventListener("click", heartToggler);

renderElements(initialCards);
