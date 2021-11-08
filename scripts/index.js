import { FormValidator as Validator, config as cfg } from "./FormValidator.js";
import initialCards from "./cards.js";
import { Card } from './Card.js';

const popupTypeEdit = document.querySelector(".popup_type_edit"); // select popup where type edit;
const popupTypeAddCard = document.querySelector(".popup_type_add-card"); // select popup where type add-card
const popupTypeImage = document.querySelector(".popup_type_image");
const popupEditBtn = document.querySelector(".profile__item-button-edit");
const buttonAddCard = document.querySelector(".profile__item-button-add");
const popupEditCloseBtn = popupTypeEdit.querySelector(".popup__close_type_edit");
const popupAddCloseBtn = popupTypeAddCard.querySelector(".popup__close_type_add-card");
const popupImageCloseBtn = popupTypeImage.querySelector(".popup__close_type_image");
const formElementEdit = document.querySelector(".popup__form_type_edit"); // for button edit
const formElementAddCard = document.querySelector(".popup__form_add-card"); // for button eddit card
const nameInput = document.getElementById("form-title"); //  for profile
const jobInput = document.getElementById("form-subtitle"); // for profile
const inputLink = document.getElementById("form-link"); // for card
const inputName = document.getElementById("form-name"); //for card
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const popupAllList = document.querySelectorAll(".popup"); //for all popup
const submitButton = document.querySelector('.popup__form-submit');

popupAllList.forEach((popupClose) =>
  popupClose.addEventListener("mousedown", closePopupByClickOnOverlay)
);
formElementEdit.addEventListener("submit", submitFormProfileHandler); // for popupTypeEdit
formElementAddCard.addEventListener("submit", submitFormAddCard);

popupEditBtn.addEventListener("click", () => {
  profileSubmitForm();
  openPopup(popupTypeEdit);
});

buttonAddCard.addEventListener("click", () => {
  openPopup(popupTypeAddCard);
});

popupEditCloseBtn.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

popupAddCloseBtn.addEventListener("click", () => {
  closePopup(popupTypeAddCard);
});

popupImageCloseBtn.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickOnEsc);
}

function closePopup(popup, e) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByClickOnEsc);

}

function submitFormAddCard(evt) {
  evt.preventDefault();
  const name = inputName.value;
  const link = inputLink.value;
  renderCard(createCard({ name, link }));
  closePopup(popupTypeAddCard);
  inputName.value = "";
  inputLink.value = "";
  resetCardForm(popupTypeAddCard);
}

function submitFormProfileHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupTypeEdit);
  resetCardForm(popupTypeEdit);
}

function profileSubmitForm() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// добавления карточки, тяжело дается ООП( // спасибо за поддержку!
const cardsContainer = document.querySelector(".card-grid"); // находим секцию куда необходимо добавить карточку
initialCards.forEach((element) => { // перебираем массив с данными для карточек
  const cardElement = createCard(element); // создаем карту
  renderCard(cardElement); // добавляем карту на страницу
});

function createCard(element) {
  // Создадим экземпляр карточки
  const newCard = new Card(element, "#card-grid-template"); // создаем данные
  // Создаём карточку и возвращаем наружу
  return newCard.generateCard();
}

function renderCard(data) { // функция добавления карт
  cardsContainer.prepend(data);
}

function closePopupByClickOnOverlay(e) {
  //close popup mousedown
  if (e.target.classList.contains("popup_opened")) {
    closePopup(e.target);
  }
}

export function closePopupByClickOnEsc(e) {
  if (e.key === "Escape") {
    const activPopup = document.querySelector(".popup_opened");
    closePopup(activPopup);
  }
}

function resetCardForm(formElement) {
  const submitButton = formElement.querySelector('.popup__form-submit');
  submitButton.classList.add('popup__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
}


//on validation
const validatorEdit = new Validator(cfg, formElementEdit);
validatorEdit.enableValidation();
const validatorAddCard = new Validator(cfg, formElementAddCard);
validatorAddCard.enableValidation();
