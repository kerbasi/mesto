class Card {
  constructor(
    { data, userId, handleImageClick, handleTrashClick, handleLikeClick },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._isLiked = data.likes.some((like) => like._id === this._userId);
    this._likeCounter = this._likeCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick.bind(this);
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element");
    return cardElement;
  }

  _setLikesCounter(data) {
    this._likeCounter = data.likes.length;
  }

  _addLike() {
    this._elementLikeImage.classList.add("element__heart-image_active");
    this._isLiked = true;
    this._elementLikeCounter.textContent = this._likeCounter;
  }

  _removeLike() {
    this._elementLikeImage.classList.remove("element__heart-image_active");
    this._isLiked = false;
    this._elementLikeCounter.textContent = this._likeCounter;
  }

  _handleTrashImageClick() {
    this._handleTrashClick(this._id, this._element);
  }

  _handleLikeImageClick() {
    this._handleLikeClick(
      this._id,
      this._isLiked,
      this._addLike.bind(this),
      this._removeLike.bind(this),
      this._setLikesCounter.bind(this)
    );
  }

  _setEventListeners() {
    this._elementTrashImage.addEventListener("click", () => {
      this._handleTrashImageClick();
    });
    this._elementLikeImage.addEventListener("click", () => {
      this._handleLikeImageClick();
    });
    this._elementImage.addEventListener("click", (evt) => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._element = this._getTemplate().cloneNode(true);
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLikeCounter = this._element.querySelector(
      ".element__heart-counter"
    );
    this._elementTrashImage = this._element.querySelector(
      ".element__trash-image"
    );
    this._elementLikeImage = this._element.querySelector(
      ".element__heart-image"
    );

    this._elementTitle.textContent = this._name;
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", `изображение ${this._name}`);
    this._elementLikeCounter.textContent = this._likeCounter;
    if (this._ownerId === this._userId) {
      this._elementTrashImage.classList.add("element__trash-image_visible");
    }

    if (this._isLiked) {
      this._addLike();
    }
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
