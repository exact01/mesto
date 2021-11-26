import "./index.css";
import {
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
  cardGrid,
  avatarSelector,
  configVersionOneApi as cfgApi,
  popupConfirmSelector,
  popupAvatarSelector,
  formAvatarPopupSelector,
  layerAvatarSelector,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";

const api = new Api(cfgApi);

// попап подверждения для удаления.
const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector);

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainer
);
let user;
function createCard(item) {
  const newCard = new Card(
    item,
    cardGrid,
    () => popupWithImage.open(item.name, item.link),
    {
      handleDeleteCard: function (id, card) {
        popupWithConfirm.open({
          deleteCard: function () {
            api.deleteCard(id)
              .then(() => {
                newCard.remove(card),
                  popupWithConfirm.close();
              })
              .catch((err) => { console.log(err); })
          }
        });
      },
      handleLikeCard: function (card, condition) {
        if (condition === "isLiked") {
          api.deleteLike(card._id)
            .then((cardData) => {
              newCard.setLikesInfo(cardData)
            })
            .catch((err) => {
              console.log(`Ошибка снятия лайка: ${err}`);
            })
        }
        else {
          api.addLike(card._id)
            .then((cardData) => {
              newCard.setLikesInfo(cardData);
            })
            .catch((err) => {
              console.log(`Ошибка добавления лайка: ${err}`);
            })
        }
      }
    },
    user
  );

  return newCard.generateCard();
}

// попап картинки
const popupWithImage = new PopupWithImage(showImage);

addProfileCardButton.addEventListener("click", handleAddCard);


function handleAddCard() {
  addCardPopup.open();
  validatorAddCard.cleanValidationErrors();
  // по поводу этого замечания, ошибка была на строке 182, ошибка исправлена ;), можете проверить, теперь все десейблится.
}

const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (data) => {
    renderLoading(true, formAddCard)
    api.getNewCard({
      name: data.name,
      link: data.link
    })
      .then((data) => {
        cardsContainer.prepend(createCard(data));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formAddCard);
      })
  }
}
);

addProfileEditButton.addEventListener("click", handleEditPopup);

function handleEditPopup() {
  popupEdit.open();
  validatorEdit.cleanValidationErrors();
  const profileInfo = userInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileDescription.value = profileInfo.description;
}

const userInfo = new UserInfo({
  nameSelector: profileName,
  nameJob: profileJob,
  avatarSelector: avatarSelector
});

const popupEdit = new PopupWithForm(popupTypeEdit, {
  handleFormSubmit: (data) => {

    renderLoading(true, formEditPopup)
    api.setUserProfile({
      name: data.username,
      description: data.profession
    })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          description: data.about
        });
        popupEdit.close();
      })
      .catch((err) => { console.log(err); })
      .finally(() => { renderLoading(false, formEditPopup); })
  }
});

const popupAvatar = new PopupWithForm(popupAvatarSelector, {
  handleFormSubmit: (avatarLink) => {
    console.log(avatarLink);
    renderLoading(true, formAvatarPopupSelector)
    api.updateAvatar(avatarLink.link)
      .then(() => {
        userInfo.setUserAvatar({
          avatar: avatarLink.link
        })
        popupAvatar.close();
      })
      .catch((err) => { console.log(err); })
      .finally(() => { renderLoading(false, formAvatarPopupSelector); })
  }
})

const handlerPopupAvatar = document.querySelector(layerAvatarSelector);
handlerPopupAvatar.addEventListener("click", openPopupAvatar);

function openPopupAvatar() {
  popupAvatar.open();
  validatorAvatarPopup.cleanValidationErrors();
}

function renderLoading(loading, formSelector) {
  const currentForm = document.querySelector(formSelector)
  const currentTextButton = currentForm.querySelector(".popup__form-submit");

  if (loading) {
    currentTextButton.textContent = "Сохранение...";
    currentTextButton.setAttribute("disabled", true);
    currentTextButton.style.backgroundColor = "#787373";
  } else {
    currentTextButton.textContent = "Сохранить";
    currentTextButton.removeAttribute("style");
  }
}

popupAvatar.setEventListeners();
popupWithConfirm.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
popupEdit.setEventListeners();

//on validation
const validatorEdit = new FormValidator(cfg, formEditPopup);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator(cfg, formAddCard);
validatorAddCard.enableValidation();
const validatorAvatarPopup = new FormValidator(cfg, formAvatarPopupSelector);
validatorAvatarPopup.enableValidation();


Promise.all([
  api.getUserProfile(),
  api.getInitialCards()
])
  .then(([data, cards]) => {
    user = data;
    userInfo.setUserInfo({
      name: data.name,
      description: data.about,
    })
    userInfo.setUserAvatar({
      avatar: data.avatar
    })
    cardList.render(cards);
  })
  .catch((err) => {
    console.log(err);
  })
