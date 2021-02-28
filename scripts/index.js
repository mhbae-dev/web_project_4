//VARIABLES
//Popups
const popupAdd = document.querySelector(".popup_type_add");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const formSaveProfile = document.querySelector(".popup__form_type_profile");
const formAddElement = document.querySelector(".popup__form_type_element");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileCloseButton  = document.querySelector(".popup__close-edit");

const cardAddButton = document.querySelector(".profile__add-btn")
const cardCloseButton = document.querySelector(".popup__close-btn_type_add")

const imageCloseButton = document.querySelector(".popup__close-btn_type_image")


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


//elements array
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ]; 


//FUNCTIONS
//create Card element
function createCards(input){
  const elementsTemplate = document.querySelector(".elements-template").content;
  const elementsItem = elementsTemplate.querySelector(".elements__item").cloneNode(true);
  const elementsImage = elementsItem.querySelector(".elements__image");
  const elementsTitle = elementsItem.querySelector(".elements__title");
  const elementsLikeButton = elementsItem.querySelector(".elements__like");
  const elementsDeleteButton = elementsItem.querySelector(".elements__trash");

  //handling the like event
  elementsItem.querySelector(".elements__like").addEventListener('click', function(event){
    event.target.classList.toggle("elements__like_active");
  });
  
  //handling delete event
  elementsDeleteButton.addEventListener('click', () => {
    elementsItem.remove();
  });

  //handling image popup
  elementsImage.addEventListener('click', () => {
    const image = document.querySelector(".popup__image");
    const imageCaption = document.querySelector(".popup__image-title");
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

//Handling opening and closing popups
function togglePopup(popup){
    if (!popup.classList.contains("popup_active")){
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        imageNameInput.value = "";
        imageLinkInput.value = "";
    }
    popup.classList.toggle("popup_active");
}

//form submit handler Edit Profile
function profileFormSubmit(event){
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
}

//form submit handler Add element item
function addElementSubmit(event){
  event.preventDefault();
  //create empty object
  const newElementObject = {};
  newElementObject.name = imageNameInput.value;
  newElementObject.link = imageLinkInput.value;
  const newElementItem = createCards(newElementObject);
  elementsContainer.prepend(newElementItem);
  togglePopup(popupAdd);
}


  
  //adding elements to html
  initialCards.forEach(input => {
    const elementsItem = createCards(input);
    elementsContainer.prepend(elementsItem);
  })



//EVENTS
//Add and close profile
profileEditButton.addEventListener('click', () => togglePopup(popupEdit));
profileCloseButton.addEventListener('click', () => togglePopup(popupEdit));

//Add and close new element
cardAddButton.addEventListener('click', () => togglePopup(popupAdd));
cardCloseButton.addEventListener('click', () => togglePopup(popupAdd));

//Close image popup
imageCloseButton.addEventListener('click', () => togglePopup(popupImage));


//Submit forms
formSaveProfile.addEventListener('submit', profileFormSubmit); 
formAddElement.addEventListener('submit', addElementSubmit); 