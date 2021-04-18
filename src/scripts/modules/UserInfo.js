class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
    };
  }

  setUserInfo(name, occupation) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
}

export default UserInfo;
