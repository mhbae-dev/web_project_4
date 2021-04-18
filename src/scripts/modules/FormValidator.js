//Class
class FormValidator {
  constructor(object, formElement) {
    this._form = formElement;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }

  _showInputError(input) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = input.validationMessage;

    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = "";

    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _buttonState(inputs, button) {
    const valid = inputs.every((input) => {
      return input.validity.valid;
    });
    if (valid) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  }

  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener("reset", () => {
      inputs.forEach((input) => {
        this._hideInputError(input);
      });
      this._disableButton(button);
    });

    this._buttonState(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._buttonState(inputs, button);
      });
    });
  }
}

export default FormValidator;
