import { KEYESC } from '../utils/constants.js'; // неуверен что так правильно, а по поводу валидации, если позиционировать их абсолютно, то мы не контролируем количество строк, если строк бдует больше 2ух, то что дальше, а я скажу что дальше, дальше строка влезет на инпут это тоже в корне не верно, но я сделаю так как вам удобно, можно прибегнуть в lenght в js(длина строки), но опять же такого не было в ТЗ. Это решение верное только в том случае, когда текст вы пишите сами для валидации. Возможно вы во всем правы, с теми знаниями по фронту которые есть у меня сейчас я вижу это так.
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        console.log(this._popupSelector)
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
        if (e.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", this.close);
    }
}