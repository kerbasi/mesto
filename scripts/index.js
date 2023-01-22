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
const addImagePopup = document.querySelector(".popup_type_add-image");
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

function openPopup(element, title, url) {
  const elementClassList = Array.from(element.classList);
  const formTitle = element.querySelector(".popup__input_type_title");
  const formData = element.querySelector(".popup__input_type_data");
  const popupTitle = element.querySelector(".popup__title");
  const popupImage = element.querySelector(".popup__image");

  if (elementClassList.includes("popup_type_image")) {
    popupTitle.textContent = title;
    popupImage.setAttribute("src", url);
  } else if (elementClassList.includes("popup_type_person")) {
    formTitle.value = profileName.textContent;
    formData.value = profileAbout.textContent;
  } else if (elementClassList.includes("popup_type_add-image")) {
    formTitle.value = "";
    formData.value = "";
    formTitle.placeholder = "Название";
    formData.placeholder = "Ссылка на картинку";
  }

  element.classList.add("popup_opened");
  // page.style.overflow = "hidden";
}

function closePopup(event) {
  let element;
  if (Array.from(event.target.classList).includes("popup__form")) {
    element = event.target.parentNode.parentNode;
  } else {
    element = event.target.parentNode.parentNode.parentNode;
  }
  element.classList.remove("popup_opened");
  // page.style.overflow = "scroll";
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
  closePopup(event);
}

function handleElementClick(event) {
  const eventClassList = Array.from(event.target.classList);
  const element = event.target;
  if (eventClassList.includes("element__trash-image")) {
    deleteCard(element.parentNode);
  } else if (eventClassList.includes("element__heart-image")) {
    toggleHeartClass(element);
  } else if (eventClassList.includes("element__image")) {
    const url = element.style.background.split('"')[1];
    const name = Array.from(element.parentNode.children).filter((element) =>
      Array.from(element.classList).includes("element__title")
    )[0].textContent;

    openPopup(imagePopup, name, url);
  }
}

function deleteCard(element) {
  element.remove();
}

function toggleHeartClass(element) {
  element.classList.toggle("element__heart-image_active");
}

Array.from(popups).forEach((popup) => {
  if (!Array.from(popup.classList).includes("popup_type_image")) {
    const form = popup.querySelector(".popup__form");
    form.addEventListener("submit", saveForm);
  }
  const quitButton = popup.querySelector(".popup__cross");
  quitButton.addEventListener("click", closePopup);
});

editButton.addEventListener("click", () => {
  openPopup(personPopup);
});

addButton.addEventListener("click", () => {
  openPopup(addImagePopup);
});

elements.addEventListener("click", handleElementClick);

renderInitialElements(initialCards);
