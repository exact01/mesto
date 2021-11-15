import "./index.css";
import {
  initialCards,
  cardsContainer,
  addProfileCardButton,
  addProfileEditButton,
  popupProfileName,
  popupProfileDescription,
  profileName,
  profileJob,
  popupTypeEdit,
  showImage,
  popupAddCard,
  config as cfg,
  formEditPopup,
  formAddCard,
  cardGrid
} from '../utils/constants.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const popupWithImage = new PopupWithImage(showImage);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainer
);

function createCard(element) {
  // Создадим экземпляр карточки
  const newCard = new Card(element, cardGrid, () => popupWithImage.open(element.name, element.link)); // создаем данные
  // Создаём карточку и возвращаем наружу
  return newCard.generateCard();
}

cardList.render();

addProfileCardButton.addEventListener('click', handleAddCard);


function handleAddCard() {
  addCardPopup.open();
  validatorAddCard.cleanValidationErrors();
}

const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (formData) => {
    cardsContainer.prepend(createCard(formData));
    addCardPopup.close();
  }
}
);

addProfileEditButton.addEventListener('click', handleEditPopup);

function handleEditPopup() {
  popupEdit.open();
  validatorEdit.cleanValidationErrors();
  const profileInfo = userInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileDescription.value = profileInfo.description;
}

const userInfo = new UserInfo({
  nameSelector: profileName,
  nameJob: profileJob
});

const popupEdit = new PopupWithForm(popupTypeEdit, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.username,
      description: formData.profession
    });

    popupEdit.close();
  }
})

popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
popupEdit.setEventListeners();

//on validation
const validatorEdit = new FormValidator(cfg, formEditPopup);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator(cfg, formAddCard);
validatorAddCard.enableValidation();
