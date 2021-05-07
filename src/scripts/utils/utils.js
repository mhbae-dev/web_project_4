//SAVING... TEXT ON LOAD
function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Saving...";
  } else {
    popupButton.textContent = "Saved";
  }
}

export { renderLoading };
