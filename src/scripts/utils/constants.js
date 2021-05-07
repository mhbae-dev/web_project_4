//FORM VALIDATION OBJECT
const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//ELEMENTS ARRAY
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//VARIABLES
//card container
const elementsContainer = document.querySelector(".elements__container");
const avatarImg = document.querySelector(".profile__avatar");
//inputs
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

//Open buttons
const profileEditButton = document.querySelector(".profile__edit-btn");
const avatarEditButton = document.querySelector(".profile__avatar-container");
const cardAddButton = document.querySelector(".profile__add-btn");

//Save buttons
const profileSaveButton = document.querySelector(".popup__button_type_edit");
const cardSaveButton = document.querySelector(".popup__button_type_add");
const avatarSaveButton = document.querySelector(".popup__button_type_avatar");

//forms
const formSaveProfile = document.querySelector(".popup__form_type_profile");
const formAddElement = document.querySelector(".popup__form_type_element");
const formAvatar = document.querySelector(".popup__form_type_avatar");

//EXPORTS
export {
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
};
