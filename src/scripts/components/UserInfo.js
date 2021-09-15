class UserInfo {
  constructor({ name, occupation, avatar }) {
    this._name = name;
    this._occupation = occupation;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src,
      _id: this._id,
    };
  }

  setUserInfo({ name, occupation, avatar, _id }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

export default UserInfo;
