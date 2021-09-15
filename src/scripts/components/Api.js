class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  //POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  addLikeStatus(cardID, userData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "PUT",
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  removeLikeStatus(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

export default Api;
