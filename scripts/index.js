let popup = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let editButton = document.querySelector(".profile__edit-btn");
let closeButton  = document.querySelector(".popup__close-btn");
let nameInput = form.querySelector(".popup__input_type_name");
let jobInput = form.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__profession");


function togglePopup(){
    if (!popup.classList.contains("popup_active")){
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    popup.classList.toggle("popup_active");
}

function handleFormSubmit(event){
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
form.addEventListener('submit', handleFormSubmit); 