//SAVING... TEXT ON LOAD
function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Saving...";
  } else {
    popupButton.textContent = "Saved";
  }
}

//DELETING.. TEXT ON LOAD
function renderDeleting(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Deleting...";
  } else {
    popupButton.textContent = "Deleted";
  }
}

export { renderLoading, renderDeleting };
