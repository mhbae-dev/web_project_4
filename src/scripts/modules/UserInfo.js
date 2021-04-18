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

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput.value;
    this._occupation.textContent = jobInput.value;
  }
}

export default UserInfo;
