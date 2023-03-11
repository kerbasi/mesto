class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popup.classList.remove("popup_opened");
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__cross-image")
      ) {
        this._close();
      }
    });
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._boundHandleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._boundHandleEscClose);
  }
}

export default Popup;
