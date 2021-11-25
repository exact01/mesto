import { KEYESC } from "../utils/constants.js";
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._closeButton = this._popupSelector.querySelector(".popup__close");
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add("popup_opened");
        this._popupSelector.addEventListener("mousedown", this._handleOverlayClose);
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popupSelector.classList.remove("popup_opened");
        this._popupSelector.removeEventListener("mousedown", this._handleOverlayClose);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key == KEYESC) {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target.classList.contains("popup_opened")) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", this.close);
    }
}