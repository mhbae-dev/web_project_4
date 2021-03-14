//VARIABLES
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
//create Card element
function createCard(input) {
  const elementsTemplate = document.querySelector(".elements-template").content;
  const elementsItem = elementsTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const elementsImage = elementsItem.querySelector(".elements__image");
  const elementsTitle = elementsItem.querySelector(".elements__title");
  const elementsLikeButton = elementsItem.querySelector(".elements__like");
  const elementsDeleteButton = elementsItem.querySelector(".elements__trash");

  //handling the like event
  elementsItem
    .querySelector(".elements__like")
    .addEventListener("click", () => {
      elementsLikeButton.classList.toggle("elements__like_active");
    });

  //handling delete event
  elementsDeleteButton.addEventListener("click", () => {
    elementsItem.remove();
  });

  //handling image popup
  elementsImage.addEventListener("click", () => {
    image.src = input.link;
    image.alt = `Picture of ${input.name}`;
    imageCaption.textContent = input.name;
    togglePopup(popupImage);
  });

  //information for the created element
  elementsTitle.textContent = input.name;
  elementsImage.style.backgroundImage = `url(${input.link})`;
  elementsImage.alt = `Picture of ${input.name}`;

  return elementsItem;
}

//Handling toggle active popups
function togglePopup(popup) {
  popup.classList.toggle("popup_active");
  document.addEventListener("keydown", escapePopup);
}

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
}

//form submit handler Edit Profile
function profileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//form submit handler Add element item
function addElementSubmit(event) {
  event.preventDefault();
  //create empty object
  const newElementObject = {};
  newElementObject.name = imageNameInput.value;
  newElementObject.link = imageLinkInput.value;
  const newElementItem = createCard(newElementObject);
  elementsContainer.prepend(newElementItem);
  togglePopup(popupAdd);
}

//adding elements to html
initialCards.forEach((input) => {
  const elementsItem = createCard(input);
  elementsContainer.prepend(elementsItem);
});

//close popup on escape
function escapePopup(event) {
  if (event.key === "Escape") {
    const targetPopup = document.querySelector(".popup_active");
    togglePopup(targetPopup);
  }
}

//close popup on click
function closeClick(event) {
  if (event.target.classList.contains("popup_active")) {
    const targetPopup = document.querySelector(".popup_active");
    togglePopup(targetPopup);
  }
}

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

//close popup on click
document.addEventListener("click", closeClick);
