import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCurrent = document.querySelector(popupSelector);
        this._popupImage = this._popupCurrent.querySelector(".popup__image-full");
      };
    open(name, link){
        super.open();
        this._popupCurrent.querySelector(".popup__text").textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
    }  
}