class Card {
  constructor({ data, openPopup }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._imagePopup = document.querySelector(".popup_type_image");
    this._imagePopupImg = this._imagePopup.querySelector(".popup__image");
    this._imagePopupTitle = this._imagePopup.querySelector(
      ".popup__title_type_image"
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element");
    return cardElement;
  }

  _handleTrashImageClick() {
    this._element.remove();
  }

  _handleLikeImageClick() {
    this._elementLikeImage.classList.toggle("element__heart-image_active");
  }

  _handleImageClick(evt) {
    this._imagePopupImg.setAttribute("src", evt.target.getAttribute("src"));
    this._imagePopupImg.setAttribute(
      "alt",
      `увеличенное изображение ${this._name}`
    );
    this._imagePopupTitle.textContent = this._name;
    this._openPopup(this._imagePopup);
  }

  _setEventListeners() {
    this._elementTrashImage.addEventListener("click", () => {
      this._handleTrashImageClick();
    });
    this._elementLikeImage.addEventListener("click", () => {
      this._handleLikeImageClick();
    });
    this._elementImage.addEventListener("click", (evt) => {
      this._handleImageClick(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate().cloneNode(true);
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTrashImage = this._element.querySelector(
      ".element__trash-image"
    );
    this._elementLikeImage = this._element.querySelector(
      ".element__heart-image"
    );

    this._elementTitle.textContent = this._name;
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", `изображение ${this._name}`);

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
