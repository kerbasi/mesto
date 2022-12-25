﻿const editButton = document.querySelector(".profile__edit-button");
const plusButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const saveButton = popup.querySelector(".popup__button");
const quitButton = popup.querySelector(".popup__cross");
const form = document.forms[0];
const profileName = document.querySelector(".profile__info-title");
const profileAbout = document.querySelector(".profile__info-subtitle");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escHandler);
  form.name.value = profileName.textContent;
  form.about.value = profileAbout.textContent;
});

quitButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escHandler);
});

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  profileName.textContent = form.name.value;
  profileAbout.textContent = form.about.value;
  popup.classList.remove("popup_opened");
});

function escHandler(e) {
  if (e.key === "Escape") {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escHandler);
  }
}