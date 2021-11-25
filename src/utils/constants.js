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
export const avatarSelector = '.profile__avatar';



//popup edit profile 
export const popupTypeEdit = ".popup_type_edit";
export const popupEditCloseBtn = document.querySelector(".popup__close_type_edit");


// form edit profile
export const formEditPopup = ".popup__form_type_edit";
export const popupProfileName = document.querySelector("#form-title");
export const popupProfileDescription = document.querySelector("#form-subtitle");

//popup add card
export const popupAddCard = ".popup_type_add-card";

//popup for change avatar
export const popupAvatarSelector = ".popup_type_avatar";
export const formAvatarPopupSelector = ".popup__form_avatar";
export const layerAvatarSelector = ".profile__layer";

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
export const KEYESC = "Escape";

//add in html section
export const cardsContainer = document.querySelector(".card-grid");
// for search 
export const cardGrid = "#card-grid-template";
//popup for confirm 
export const popupConfirmSelector = ".popup_type_confirm";

//like
export const likeActiveClass = "card-grid__like_activate";
export const likeCounterSelector = ".card-grid__like-counter";
export const likeSelector = ".card-grid__like";

//api 
export const configVersionOneApi = {
    url: "https://mesto.nomoreparties.co/v1/cohort-30",
    cohort: "/cohort-30",
    headers: { 
        authorization: '4536fb85-801b-4a38-930f-997399689a92',
        'Content-Type': 'application/json'
    },
    methods: {
        post: "POST",
        get: "GET",
        delete: "DELETE",
        put: "PUT",
        patch: "PATCH"
    },
    requests: { // suddenly api change ;)
        cards: "/cards",
        users: "/users",
        me: "/me",
        likes: "/likes",
        avatar: "/avatar"
    }
};