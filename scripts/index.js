import initialCards from "./cards.js";
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
const cardContainer = document.querySelector(".card-grid");
const popupAllList = document.querySelectorAll('.popup'); //for all popup

popupAllList.forEach(closepopup => closepopup.addEventListener('mousedown', closePopupByClickOnOverlay));
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
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  const name = inputName.value;
  const link = inputLink.value;
  addCard(link, name, "prepend");
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

initialCards.forEach((element) => {
  addCard(element.name, element.link, "append");
});

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-grid-template").content;
  const cardElement = cardTemplate
    .querySelector(".card-grid__item")
    .cloneNode(true);

  const cardDelete = cardElement.querySelector(
    ".card-grid__button-remove-card"
  );
  cardDelete.addEventListener("click", function () {
    cardElement.remove();
  });
  const popupOpenImage = cardElement.querySelector(".card-grid__image");

  popupOpenImage.addEventListener("click", function () {
    popupSrcImage.src = link;
    popupSrcImage.alt = name;
    popupTextImage.textContent = name;
    openPopup(popupTypeImage);
  });

  const like = cardElement.querySelector(".card-grid__like");
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card-grid__like_activate");
  });
  popupOpenImage.src = link;
  popupOpenImage.alt = name;
  cardElement.querySelector(".card-grid__subtitle").textContent = name;
  return cardElement; // back arr in a createCard
}

function addCard(name, link, appOrPre = "append", e) {
  switch (appOrPre) {
    case "append":
      cardContainer.append(createCard(name, link));
      break;
    case "prepend":
      cardContainer.prepend(createCard(name, link));
      break;
  }
}

function closePopupByClickOnOverlay(e) { //close popup mousedown
	if (e.target.classList.contains('popup_opened')) {
		closePopup(e.target);
	} 
};

function closePopupByClickOnEsc(e) {
	if(e.key === "Escape"){
		const activPopup = document.querySelector('.popup_opened');
		closePopup(activPopup);
	}
}