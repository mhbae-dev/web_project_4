//Imports
import "./index.css";
import {
  validationObject,
  initialCards,
  elementsContainer,
  avatarImg,
  profileJob,
  profileName,
  profileEditButton,
  avatarEditButton,
  cardAddButton,
  profileSaveButton,
  cardSaveButton,
  avatarSaveButton,
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
import { renderLoading } from "../scripts/utils/utils.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "5ba73148-e2fc-4c55-8f70-b1a18db29f75",
    "Content-Type": "application/json",
  },
});

// //SERVER INFORMATION
// Promise.all([api.getUserInfo(), api.getInitialCards()])
//     .then(([resUserInfo, dataInitialCards]) => {
//       userInfo.setUserInfo(resUserInfo);

api.getInitialCards().then((res) => {
  //LOADING ELEMENTS TO PAGE
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
      renderLoading(true, cardSaveButton);
      api
        .addCard(inputValues)
        .then((data) => {
          cards.addItem(
            createCard({
              name: data.title,
              link: data.image,
            })
          );
          renderLoading(false, cardSaveButton);
        })
        .then(() => {
          addElementPopup.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //Create Cards
  function createCard(input) {
    const card = new Card(
      input,
      ".elements-template",
      handCardClick,
      handleDeleteButton,
      handleCardLike
    );
    const cardItem = card.generateCard();
    return cardItem;
  }

  //HANDLE CARD DELETE
  function handleDeleteButton(cardId, cardItem) {
    popupDelete.open(cardId, cardItem);
  }

  // //HANDLE CARD LIKE
  function handleCardLike(cardId, card) {
    if (card.isLiked()) {
      api
        .addLikeStatus(cardId)
        .then((res) => {
          card.likes(res.likes);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLikeStatus(cardId)
        .then((res) => {
          card.likes(res.likes);
        })
        .catch((err) => console.log(err));
    }
  }

  //HANDLE CARD CLICK
  function handCardClick(name, link) {
    popupImage.open(name, link);
  }

  addElementPopup.setEventListeners();
  cardAddButton.addEventListener("click", () => {
    addElementPopup.open();
  });
});

//RECEIVE USER INFORMATION FROM SERVER
api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

//USER INFO
const userInfo = new UserInfo({
  name: profileName,
  occupation: profileJob,
  avatar: avatarImg,
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

//EDIT PROFILE POPUP
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submitHandler: (inputValues) => {
    renderLoading(true, profileSaveButton);
    api
      .setProfileInfo({
        name: inputValues.name,
        about: inputValues.description,
        avatar: inputValues.avatar,
      })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        renderLoading(false, profileSaveButton);
      })
      .then(() => {
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
const popupDelete = new PopupDelete({
  popupSelector: ".popup_type_delete",
  submitHandler: (cardId) => {
    api
      .removeCard(cardId)
      .then(() => {
        popupDelete.handleDelete();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupDelete.setEventListeners();

//AVATAR POPUP
const avatarPopup = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitHandler: (inputValues) => {
    renderLoading(true, avatarSaveButton);
    api
      .setUserAvatar(inputValues.avatar)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        renderLoading(false, avatarSaveButton);
      })
      .then(() => {
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});
