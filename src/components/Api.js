class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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
}

export default Api;
