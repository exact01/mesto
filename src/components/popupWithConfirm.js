import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._confirmButton = this._popupSelector.querySelector(".popup__form-submit_fix");
  }

  open({ deleteCard }) {
    super.open();
    this._deleteCard = deleteCard;
    this._confirmButton.addEventListener("click", this._deleteCard);
  }

  close(){
    super.close();
    this._confirmButton.removeEventListener("click", this._deleteCard);
  }
}