//show error element
const showInputError = (
  input,
  form,
  { errorClass, inputErrorClass, ...rest }
) => {
  const error = document.querySelector("#" + input.id + "-error");
  error.textContent = input.validationMessage;

  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
};

//hide error element
const hideInputError = (
  input,
  form,
  { errorClass, inputErrorClass, ...rest }
) => {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";

  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
};

//check if the input if valid
const isValid = (input, form, rest) => {
  if (!input.validity.valid) {
    showInputError(input, form, rest);
  } else {
    hideInputError(input, form, rest);
  }
};

const buttonState = (inputs, button, { inactiveButtonClass, ...rest }) => {
  const valid = inputs.every((input) => input.validity.valid);
  if (valid) {
    button.classList.remove(inactiveButtonClass);
  } else {
    button.classList.add(inactiveButtonClass);
  }
};

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  ...rest
}) {
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = [...form.querySelector(submitButtonSelector)];

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(input, form, rest);
        buttonState(inputs, form, rest);
      });
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
