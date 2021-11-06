import { FormValidator as Validator, config as cfg } from "./FormValidator.js";
import initialCards from "./cards.js";
import { Card } from './Card.js';

const popupTypeEdit = document.querySelector(".popup_type_edit"); // select popup where type edit;
const popupTypeAddcard = document.querySelector(".popup_type_add-card"); // select popup where type add-card
const popupTypeImage = document.querySelector(".popup_type_image");
const popupSrcImage = document.querySelector(".popup__image-full");
const popupTextImage = document.querySelector(".popup__text");
const popupEditBtn = document.querySelector(".profile__item-button-edit");
const popupAddCard = document.querySelector(".profile__item-button-add");
const popupCloseBtnOne = popupTypeEdit.querySelector(".popup__close_one");
const popupCloseBtnTwo = popupTypeAddcard.querySelector(".popup__close_two");
const popupCloseBtnThree = popupTypeImage.querySelector(".popup__close_three");
const formElementEdit = document.querySelector(".popup__form_type_edit"); // for button edit
const formElementAddCard = document.querySelector(".popup__form_add-card"); // for button eddit card
const nameInput = document.getElementById("form-title"); //  for profile
const jobInput = document.getElementById("form-subtitle"); // for profile
const inputLink = document.getElementById("form-link"); // for card
const inputName = document.getElementById("form-name"); //for card
const youName = document.querySelector(".profile__title");
const youJob = document.querySelector(".profile__subtitle");
const popupAllList = document.querySelectorAll(".popup"); //for all popup

popupAllList.forEach((closepopup) =>
  closepopup.addEventListener("mousedown", closePopupByClickOnOverlay)
);
/* 
const submitButton = document.querySelector('.popup__form-submit');
submitButton.classList.add('popup__submit-button_disabled');
submitButton.setAttribute('disabled', true); */

formElementEdit.addEventListener("submit", formSubmitHandler); // for popupTypeEdit
formElementAddCard.addEventListener("submit", formSubmitAddCard);

popupEditBtn.addEventListener("click", () => {
  profileSubmitForm();
  openPopup(popupTypeEdit);
});

popupAddCard.addEventListener("click", () => {
  openPopup(popupTypeAddcard);
});

popupCloseBtnOne.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

popupCloseBtnTwo.addEventListener("click", () => {
  closePopup(popupTypeAddcard);
});

popupCloseBtnThree.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByClickOnEsc);
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  const name = inputName.value;
  const link = inputLink.value;
  addCardSubmit(createCard({ name, link }));
  closePopup(popupTypeAddcard);
  inputName.value = "";
  inputLink.value = "";
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  youName.textContent = nameInput.value;
  youJob.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

function profileSubmitForm() {
  nameInput.value = youName.textContent;
  jobInput.value = youJob.textContent;
}

// добавления карточки, тяжело дается ООП(
const inputCard = document.querySelector(".card-grid"); // находим секцию куда необходимо добавить карточку
initialCards.forEach((element) => { // перебираем массив с данными для карточек
  const cardElement = createCard(element); // создаем карту
  inputCard.prepend(cardElement); // добавляем карту на страницу
});

function createCard(element) { 
  // Создадим экземпляр карточки
  const cardNew = new Card(element, "#card-grid-template"); // создаем данные
  // Создаём карточку и возвращаем наружу
  return cardNew.generateCard();
}

function addCardSubmit(date){ // для добавления карты через сабмит
  inputCard.prepend(date); // добавляем карту на страницу
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

//on validation
const validatorEdit = new Validator(cfg, formElementEdit);
validatorEdit.enableValidation();
const validatorAddCard = new Validator(cfg, formElementAddCard);
validatorAddCard.enableValidation();
