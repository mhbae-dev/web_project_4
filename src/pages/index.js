//Imports
import "./index.css";
import {
  validationObject,
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
  deleteConfirmButton,
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
import { renderLoading, renderDeleting } from "../scripts/utils/utils.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "5ba73148-e2fc-4c55-8f70-b1a18db29f75",
    "Content-Type": "application/json",
  },
});
//HANDLE API
api
  .getAppInfo()
  .then(([cardData, serverInfo]) => {
    const user = serverInfo;
    userInfo.setUserInfo({
      name: serverInfo.name,
      occupation: serverInfo.about,
      avatar: serverInfo.avatar,
      _id: serverInfo._id,
    });

    //HANDLE CARD DELETE
    function handleDeleteButton(cardId, cardItem) {
      popupDelete.open(cardId, cardItem);
    }

    // //HANDLE CARD LIKE
    function handleCardLike(card) {
      if (card.isLiked()) {
        api
          .removeLikeStatus(card.getId())
          .then((data) => {
            card.updateLikesCounter(data, user);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLikeStatus(card.getId(), user)
          .then((data) => {
            card.updateLikesCounter(data, user);
          })
          .catch((err) => console.log(err));
      }
    }

    //HANDLE CARD CLICK
    function handCardClick(name, link) {
      popupImage.open(name, link);
    }

    //LOADING ELEMENTS TO PAGE
    const cards = new Section(
      {
        items: cardData,
        renderer: (input) => {
          cards.addItem(createCard(input));
        },
      },
      elementsContainer
    );
    cards.renderer();

    //CREATE CARDS
    function createCard(input) {
      const card = new Card(
        input,
        ".elements-template",
        handCardClick,
        handleDeleteButton,
        handleCardLike
      );
      const cardItem = card.generateCard(user._id);
      return cardItem;
    }

    //ADD POPUP
    const addElementPopup = new PopupWithForm({
      popupSelector: ".popup_type_add",
      submitHandler: ({ title: name, image: link }) => {
        renderLoading(true, cardSaveButton);
        api
          .addCard({ name, link })
          .then((data) => {
            cards.addItem(createCard(data));
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

    addElementPopup.setEventListeners();
    cardAddButton.addEventListener("click", () => {
      addElementPopup.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

//SET USER INFO
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
  submitHandler: ({ name: name, description: about }) => {
    renderLoading(true, profileSaveButton);
    api
      .setProfileInfo({ name, about })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          occupation: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
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

//DELETE POPUP
const popupDelete = new PopupDelete({
  popupSelector: ".popup_type_delete",
  submitHandler: (cardId, cardElement) => {
    renderDeleting(true, deleteConfirmButton);
    api
      .removeCard(cardId)
      .then(() => {
        popupDelete.handleDelete(cardElement);
        renderDeleting(false, deleteConfirmButton);
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
  submitHandler: ({ avatar: avatar }) => {
    renderLoading(true, avatarSaveButton);
    api
      .setUserAvatar({ avatar })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          occupation: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
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
