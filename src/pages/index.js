//Imports
import "./index.css";
import {
  validationObject,
  initialCards,
  elementsContainer,
  profileJob,
  profileName,
  profileEditButton,
  cardAddButton,
  nameInput,
  jobInput,
  formSaveProfile,
  formAddElement,
  imageNameInput,
  imageLinkInput,
} from "../scripts/utils/constants.js";
import FormValidator from "../scripts/modules/FormValidator.js";
import Card from "../scripts/modules/Card.js";
import PopupWithForm from "../scripts/modules/PopupWithForm.js";
import PopupWithImage from "../scripts/modules/PopupWithImage.js";
import Section from "../scripts/modules/Section.js";
import UserInfo from "../scripts/modules/UserInfo.js";

//HANDLE CARD CLICK
function handCardClick(name, link) {
  popupImage.open(name, link);
}

//LOADING ELEMENTS TO PAGE
const cards = new Section(
  {
    items: initialCards,
    renderer: (input) => {
      const card = new Card(input, ".elements-template", handCardClick);
      cards.addItem(card.generateCard());
    },
  },
  elementsContainer
);
cards.renderer();

//FORM VALIDATORS
const profileFormValidator = new FormValidator(
  validationObject,
  formSaveProfile
);
const addFormValidator = new FormValidator(validationObject, formAddElement);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

//USER INFO
const userInfo = new UserInfo({
  name: profileName,
  occupation: profileJob,
});

//EDIT PROFILE POPUP
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submitHandler: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    profilePopup.close();
  },
});
profilePopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
  const currentInput = userInfo.getUserInfo();
  nameInput.value = currentInput.name;
  jobInput.value = currentInput.occupation;
  profilePopup.open();
});

//ADD POPUP
const addElementPopup = new PopupWithForm({
  popupSelector: ".popup_type_add",
  submitHandler: () => {
    const newElementObject = {};
    newElementObject.name = imageNameInput.value;
    newElementObject.link = imageLinkInput.value;
    const newElementItem = new Card(
      newElementObject,
      ".elements-template",
      handCardClick
    );
    cards.addItem(newElementItem.generateCard());
    userInfo.setUserInfo(nameInput, jobInput);
    addElementPopup.close();
  },
});
addElementPopup.setEventListeners();
cardAddButton.addEventListener("click", () => addElementPopup.open());

//IMAGE POPUP
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();
