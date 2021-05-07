class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  addLikeStatus(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "PUT",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  removeLikeStatus(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
      )
      .catch((err) => console.log(err));
  }
}

export default Api;
