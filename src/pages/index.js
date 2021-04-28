//Imports
import "./index.css";
import {
  validationObject,
  initialCards,
  elementsContainer,
  profileJob,
  profileName,
  profileEditButton,
  avatarEditButton,
  cardAddButton,
  nameInput,
  jobInput,
  formSaveProfile,
  formAddElement,
  formAvatar,
} from "../scripts/utils/constants.js";
import FormValidator from "../scripts/modules/FormValidator.js";
import Card from "../scripts/modules/Card.js";
import PopupWithForm from "../scripts/modules/PopupWithForm.js";
import PopupWithImage from "../scripts/modules/PopupWithImage.js";
import Section from "../scripts/modules/Section.js";
import UserInfo from "../scripts/modules/UserInfo.js";
import Api from "../scripts/modules/Api.js";
import Popup from "../scripts/modules/Popup.js";
import PopupDelete from "../scripts/modules/PopupDelete.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "5ba73148-e2fc-4c55-8f70-b1a18db29f75",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((res) => {
  //LOADING ELEMENTS TO PAGE
  console.log(res);
  const cards = new Section(
    {
      items: res,
      renderer: (input) => {
        cards.addItem(createCard(input));
      },
    },
    elementsContainer
  );
  cards.renderer();

  //ADD POPUP
  const addElementPopup = new PopupWithForm({
    popupSelector: ".popup_type_add",
    submitHandler: (inputValues) => {
      api.addCard(inputValues).then((res) => {
        cards.addItem(
          createCard({
            name: inputValues.title,
            link: inputValues.image,
          })
        );
        addElementPopup.close();
      });
    },
  });

  //Create Cards
  function createCard(input) {
    const card = new Card(
      input,
      ".elements-template",
      handCardClick,
      handleDeleteButton
    );
    const cardItem = card.generateCard();
    return cardItem;
  }

  addElementPopup.setEventListeners();
  cardAddButton.addEventListener("click", () => {
    addElementPopup.open();
  });
});

//Delete Cards
function handleDeleteButton(cardID) {
  popupDelete.open();
  // api.removeCard(cardID);
}

//HANDLE CARD CLICK
function handCardClick(name, link) {
  popupImage.open(name, link);
}

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
});

//FORM VALIDATORS
const profileFormValidator = new FormValidator(
  validationObject,
  formSaveProfile
);
const addFormValidator = new FormValidator(validationObject, formAddElement);

const avatarFormValidator = new FormValidator(validationObject, formAvatar);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//USER INFO
const userInfo = new UserInfo({
  name: profileName,
  occupation: profileJob,
});

//EDIT PROFILE POPUP
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.description);
    profilePopup.close();
  },
});
profilePopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
  const inputValues = userInfo.getUserInfo();
  nameInput.value = inputValues.name;
  jobInput.value = inputValues.occupation;
  profilePopup.open();
});

//IMAGE POPUP
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

//TRASH POPUP
const popupDelete = new PopupDelete(".popup_type_delete");
popupDelete.setEventListeners();

//AVATAR POPUP
const avatarPopup = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.description);
    avatarPopup.close();
  },
});
avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});
