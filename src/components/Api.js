class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, { headers: this._headers });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, { headers: this._headers });
  }

  setUserInfo({ title, data }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: data,
      }),
    });
  }

  setCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(_id) {
    return fetch(`${this._baseUrl}cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(_id) {
    return fetch(`${this._baseUrl}cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

export default Api;
