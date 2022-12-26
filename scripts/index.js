const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const saveButton = popup.querySelector(".popup__button");
const quitButton = popup.querySelector(".popup__cross");
const form = document.querySelector(".popup__form");
const formName = form.querySelector(".popup__input_type_name");
const formAbout = form.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");

editButton.addEventListener("click", openForm);

quitButton.addEventListener("click", closeForm);

form.addEventListener("submit", saveForm);

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
  popup.classList.remove("popup_opened");
}
