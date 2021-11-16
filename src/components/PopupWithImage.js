import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(name, link){
        super.open(); 
        this._popupImage = this._popupSelector.querySelector(".popup__image-full");
        this._popupSelector.querySelector(".popup__text").textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
    }  
}