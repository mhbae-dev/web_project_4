//show error element
function showInputError(input, config) {
  const error = document.querySelector("#" + input.id + "-error");
  error.textContent = input.validationMessage;

  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

//hide error element
function hideInputError(input, config) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";

  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

//check if the input if valid
function isValid(input, form, config) {
  if (!input.validity.valid) {
    showInputError(input, form, config);
  } else {
    hideInputError(input, form, config);
  }
}

//toggle button state if valid
function buttonState(inputs, button, config) {
  const valid = inputs.every((input) => input.validity.valid);
  if (valid) {
    button.disabled = true;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.add(config.inactiveButtonClass);
  }
}

//validation
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = Array.from(
      document.querySelector(config.submitButtonSelector)
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(input, config);
        buttonState(inputs, form, config);
      });
    });
  });
}

//validation object
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
