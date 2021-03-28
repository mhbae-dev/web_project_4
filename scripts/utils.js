//Functions
function togglePopup(popup) {
  popup.classList.toggle("popup_active");
  if (popup.classList.contains("popup_active")) {
    document.addEventListener("keydown", escapePopup);
    document.addEventListener("click", closeClick);
  } else {
    document.removeEventListener("keydown", escapePopup);
    document.removeEventListener("click", closeClick);
  }
}

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

export { togglePopup, escapePopup, closeClick };
