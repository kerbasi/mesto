class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      data: this._aboutElement.textContent,
    };
  }

  setUserInfo({ title, data, _id }) {
    this._nameElement.textContent = title;
    this._aboutElement.textContent = data;
  }

  setAvatar(url) {
    this._avatarSelector.src = url;
  }

  setUserId(_id) {
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }
}

export default UserInfo;
