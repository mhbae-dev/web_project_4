//Imports
import { togglePopup, escapePopup, closeClick } from "./utils.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initialCards.js";
import Card from "./Card.js";

//VARIABLES
//form settings
const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Popups
const popupAdd = document.querySelector(".popup_type_add");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");

const image = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__image-title");

const formSaveProfile = document.querySelector(".popup__form_type_profile");
const formAddElement = document.querySelector(".popup__form_type_element");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileCloseButton = document.querySelector(".popup__close-edit");

const cardAddButton = document.querySelector(".profile__add-btn");
const cardCloseButton = document.querySelector(".popup__close-btn_type_add");

const imageCloseButton = document.querySelector(".popup__close-btn_type_image");

//Form Inputs
const nameInput = formSaveProfile.querySelector(".popup__input_type_name");
const jobInput = formSaveProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

const imageNameInput = formAddElement.querySelector(".popup__input_type_title");
const imageLinkInput = formAddElement.querySelector(".popup__input_type_image");

//Template
const elementsTemplate = document.querySelector(".elements-template").content;
const elementsContainer = document.querySelector(".elements__container");

//FUNCTIONS
//open profile popup
function profilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupEdit);
}

//open add element popup
function addElementPopup() {
  imageNameInput.value = "";
  imageLinkInput.value = "";
  togglePopup(popupAdd);
  disableButton(popupAdd);
}

//form submit handler Edit Profile
function profileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//disable button
function disableButton(popup) {
  const button = popup.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.disabled = true;
}

//form submit handler Add element item
function addElementSubmit(event) {
  event.preventDefault();
  //create empty object
  const newElementObject = {};
  newElementObject.name = imageNameInput.value;
  newElementObject.link = imageLinkInput.value;
  const newElementItem = new Card(newElementObject, ".elements-template");
  elementsContainer.prepend(newElementItem.generateCard());
  togglePopup(popupAdd);
}

//adding elements to html
initialCards.forEach((input) => {
  const card = new Card(input, ".elements-template");
  elementsContainer.prepend(card.generateCard());
});

//EVENTS
//Add and close profile
profileEditButton.addEventListener("click", () => profilePopup());
profileCloseButton.addEventListener("click", () => togglePopup(popupEdit));

//Add and close new element
cardAddButton.addEventListener("click", () => addElementPopup());
cardCloseButton.addEventListener("click", () => togglePopup(popupAdd));

//Close image popup
imageCloseButton.addEventListener("click", () => togglePopup(popupImage));

//Submit forms
formSaveProfile.addEventListener("submit", profileFormSubmit);
formAddElement.addEventListener("submit", addElementSubmit);

// new Classes
const profileFormValidator = new FormValidator(
  validationObject,
  formSaveProfile
);

const addFormValidator = new FormValidator(validationObject, formAddElement);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
