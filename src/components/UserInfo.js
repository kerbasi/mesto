class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
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
}

export default UserInfo;
