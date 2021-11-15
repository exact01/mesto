export default class Card {
  constructor(data, cardSelector, clickCard) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._src = data.link;
    this._clickCard = clickCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card-grid__item")
      .cloneNode(true);
    return cardElement;
  }

  _like(e) {
    e.target.classList.toggle("card-grid__like_activate");
  }
  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    // внутрений метод для установки слушателей
    this._elementIamge.addEventListener("click", () => {
      this._clickCard();
    });

    this._element.querySelector(".card-grid__like").addEventListener("click", (e) => {
      this._like(e);
    });

    this._element.querySelector(".card-grid__button-remove-card").addEventListener("click", () => {
      this._deleteCard();
    });

  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    // метод публичный, чтобы передать результат внешним функциям
    this._element = this._getTemplate();
    this._elementIamge = this._element.querySelector(".card-grid__image");
    this._elementName = this._element.querySelector(".card-grid__subtitle");
    this._setEventListeners();
    this._elementIamge.src = this._src;
    this._elementName.textContent = this._name;
    this._elementIamge.alt = this._name;
    // Вернём элемент наружу
    return this._element;
  }
}