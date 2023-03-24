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
}

export default Api;
