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

  setUserInfo({ title, data }) {
    this._nameElement.textContent = title;
    this._aboutElement.textContent = data;
  }

  setAvatar(url) {
    this._avatarSelector.src = url;
  }
}

export default UserInfo;
