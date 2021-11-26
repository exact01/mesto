import { likeActiveClass, likeCounterSelector, likeSelector } from "../utils/constants.js";
export default class Card {
  constructor(data, cardSelector, clickCard, { handleDeleteCard, handleLikeCard }, user) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._name = data.name;
    this._src = data.link;
    this._clickCard = clickCard;
    this._amountLikes = data.likes.length;
    this._handleDeleteCard = handleDeleteCard;
    this._ownerItemId = data.owner._id;
    this._userId = user._id;
    this._itemId = data._id;
    this._handleLikeCard = handleLikeCard;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card-grid__item")
      .cloneNode(true);
    return cardElement;
  }



  setLikesInfo(data) { // постановка лайка
    this._likeCounter = this._element.querySelector(likeCounterSelector);
    this._likeCounter.textContent = data.likes.length;
    this._likeElement = this._element.querySelector(likeSelector);
    this._likeElement.classList.toggle(likeActiveClass)
  }

  _like() {
    if (this._likes.find(data => data._id === this._userId)) {
      this._element
        .querySelector(likeSelector)
        .classList
        .add(likeActiveClass)
    } else {
      this._element
        .querySelector(likeSelector)
        .classList
        .remove(likeActiveClass)
    }

    this._likeCounter = this._element.querySelector(likeCounterSelector);
    this._likeCounter.textContent = this._amountLikes;
  }

  _deleteCard() {
    this._handleDeleteCard(this._itemId, this._element);
  }

  _setEventListeners() {
    this._elementIamge.addEventListener("click", () => {
      this._clickCard();
    })

    this._likeElement = this._element.querySelector(likeSelector);

    this._likeElement.addEventListener("click", () => {
      if (this._likeElement.classList.contains(likeActiveClass)) {
        this._handleLikeCard(this._data, "isLiked")
      } else {
        this._handleLikeCard(this._data)
      }
    });

    this._removeEl = this._element.querySelector(".card-grid__button-remove-card")
    if (this._userId === this._ownerItemId) {
      this._removeEl.addEventListener("click", () => {
        this._deleteCard();
      });
    } else {
      this._removeEl.remove();
    }
  }

  remove(card) {
    card.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementIamge = this._element.querySelector(".card-grid__image");
    this._elementName = this._element.querySelector(".card-grid__subtitle");
    this._setEventListeners();
    this._like();
    this._elementIamge.src = this._src;
    this._elementName.textContent = this._name;
    this._elementIamge.alt = this._name;
    // Вернём элемент наружу
    return this._element;
  }
}