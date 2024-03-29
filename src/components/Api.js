﻿class Api {
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
    return fetch(`${this._baseUrl}cards`, { headers: this._headers }).then(
      (res) => this._getResponseData(res)
    );
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, { headers: this._headers }).then(
      (res) => this._getResponseData(res)
    );
  }

  setUserInfo({ title, data }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: data,
      }),
    }).then((res) => this._getResponseData(res));
  }

  setCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  addLike(_id) {
    return fetch(`${this._baseUrl}cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  removeLike(_id) {
    return fetch(`${this._baseUrl}cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

export default Api;
