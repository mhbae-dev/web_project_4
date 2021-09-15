//SAVING... TEXT ON LOAD
function renderLoading(isLoading, popupButton, buttonText) {
  if (isLoading) {
    popupButton.textContent = buttonText;
  } else {
    popupButton.textContent = buttonText;
  }
}

export { renderLoading };
