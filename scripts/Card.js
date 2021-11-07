//import initialCards from "./cards.js";
import { closePopupByClickOnEsc as closeFromEsc } from "./index.js";

// необходиммы переменные для работы класса Card
const fullImage = document.querySelector(".popup_type_image");
const fullCardImage = document.querySelector(".popup__image-full");
const fullCardName = document.querySelector(".popup__text");
const closeButton = document.querySelector(".popup__close_type_image");
// 

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._src = data.link;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card-grid__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  _handleOpenPopup() {
    // внутрений метод для вызова карточки
    fullCardImage.src = this._src;
    fullCardImage.alt = this._name;
    fullCardName.textContent = this._name;
    fullImage.classList.add("popup_opened");
    document.addEventListener("keydown", closeFromEsc);
  }

  _handleClosePopup() {
    // внутрений метод для установки слушателя для каждой создаваемой карточки
    fullImage.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeFromEsc);
  }
  _like(e) {
    // внутрений метод для постановки лайка на каждую карточку
    e.target.classList.toggle("card-grid__like_activate");
  }
  _deleteCard() {
    // внутрений метод для удаления карточки
    this._element.remove();
  }

  _setEventListeners() {
    // внутрений метод для установки слушателей
    this._element
      .querySelector(".card-grid__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

    closeButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    this._element
      .querySelector(".card-grid__like")
      .addEventListener("click", (event) => {
        this._like(event);
      });

    this._element
      .querySelector(".card-grid__button-remove-card")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    // метод публичный, чтобы передать результат внешним функциям
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card-grid__image").src = this._src;
    this._element.querySelector(".card-grid__subtitle").textContent =
      this._name;
    this._element.querySelector(".card-grid__image").alt = this._name;

    // Вернём элемент наружу
    return this._element;
  }
}