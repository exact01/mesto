export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const config = {
    selectorForm: ".popup__input-profile",
    selectorSubmitButton: ".popup__form-submit",
    selectorInputProfile: ".popup__input-profile",
    classInactiveButton: "popup__submit-button_inactive",
    classInputError: "popup__field-classError-inactive",
    classError: "popup__error",
};
// profile 
export const profileName = ".profile__title";
export const profileJob = ".profile__subtitle"
export const addProfileEditButton = document.querySelector(".profile__item-button-edit");
export const addProfileCardButton = document.querySelector(".profile__item-button-add");



//popup edit profile 
export const popupTypeEdit = ".popup_type_edit";
export const popupEditCloseBtn = document.querySelector(".popup__close_type_edit");


// form edit profile
export const formEditPopup = ".popup__form_type_edit";
export const popupProfileName = document.querySelector("#form-title");
export const popupProfileDescription = document.querySelector("#form-subtitle");

//popup add card
export const popupAddCard = ".popup_type_add-card";

//form add new card
export const formAddCard = ".popup__form_add-card";
export const nameNewCard = document.querySelector(".popup__input-profile_name");
export const newLinkCard = document.querySelector(".popup__input-profile_link");

// popup image
export const showImage = ".popup_type_image";
export const fullCardName = document.querySelector(".popup__text");
export const fullCardImage = document.querySelector(".popup__image-full");

//all popup

export const popupList = document.querySelectorAll(".popup"); 

//add in html section
export const cardsContainer = document.querySelector(".card-grid");
// for search 
export const cardGrid = "#card-grid-template";