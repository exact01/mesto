import Popup from "./Popup.js"; // тут Вы правы, затуп засчитан в мою пользу.

export default class PopupWithImage extends Popup {
    open(name, link){
        super.open();
        this._popupImage = document.querySelector(".popup__image-full");
        document.querySelector(".popup__text").textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
    }  
}