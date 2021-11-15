import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector(".popup__form");
        this._inutList = this._popupForm.querySelectorAll(".popup__input-profile");
        this._submitButton = this._popupForm.querySelector(".popup__form-submit");
    }

    _getInputValues() {
        this._formValue = {};
        this._inutList.forEach(element => {
            this._formValue[element.name] = element.value;
        });

        return this._formValue;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close(){
        super.close();
        this._submitButton.classList.add("popup__submit-button_inactive");
        this._submitButton.setAttribute("disabled", true);
        this._popupForm.reset();
    }
}