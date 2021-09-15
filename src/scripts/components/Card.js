//Card class
class Card {
  constructor(
    data,
    elementSelector,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }

  getId() {
    return this._id;
  }

  _getCardTemplate() {
    const elementsTemplate = document.querySelector(
      this._elementSelector
    ).content;
    return elementsTemplate;
  }

  isLiked() {
    return this._liked;
  }

  _addLike() {
    this._liked = true;

    this._card
      .querySelector(".elements__like")
      .classList.add("elements__like_active");
  }

  _removeLike() {
    this._liked = false;

    this._card
      .querySelector(".elements__like")
      .classList.remove("elements__like_active");
  }

  _likeStatus(user) {
    if (this._likes.find((like) => like._id === user)) {
      this._liked = true;
    } else {
      this._liked = false;
    }
    return this._liked;
  }

  updateLikesCounter(data, user) {
    this._likes = data.likes;

    if (this._likeStatus(user._id)) {
      this._addLike();
    } else {
      this._removeLike();
    }

    this._card.querySelector(".elements__like-counter").textContent =
      this._likes.length;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("elements__like_active");
  }

  // _handleDeleteButton() {
  //   this._card.remove();
  // }

  _setEventListeners(user) {
    const elementsImage = this._card.querySelector(".elements__image");
    const elementsLikeButton = this._card.querySelector(".elements__like");
    const elementsDeleteButton = this._card.querySelector(".elements__trash");

    //handling the like event
    elementsLikeButton.addEventListener("click", () =>
      this._handleLikeButton(this)
    );

    //handling delete event
    if (!(this._owner === user)) {
      elementsDeleteButton.remove();
    } else {
      elementsDeleteButton.addEventListener("click", () => {
        this._handleDeleteButton(this._id, this._card);
      });
    }

    //handling image popup
    elementsImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard(user) {
    this._card = this._getCardTemplate()
      .querySelector(".elements__item")
      .cloneNode(true);
    const elementsImage = this._card.querySelector(".elements__image");
    const elementsTitle = this._card.querySelector(".elements__title");
    const elementsLikesCounter = this._card.querySelector(
      ".elements__like-counter"
    );
    //information for the created element
    elementsTitle.textContent = this._name;
    elementsImage.style.backgroundImage = `url(${this._link})`;
    elementsImage.alt = `Picture of ${this._name}`;
    elementsLikesCounter.textContent = this._likes.length;
    if (this._likeStatus(user)) {
      this._card
        .querySelector(".elements__like")
        .classList.add("elements__like_active");
    }
    this._setEventListeners(user);

    return this._card;
  }
}

export default Card;
