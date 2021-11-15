export default class FormValidator {
  constructor(config, formElement) {
    this._config = config; //config local 
    this._formElement = document.querySelector(formElement);
    this._submitButton = this._formElement.querySelector(this._config.selectorSubmitButton); 
    this._inputForm = Array.from(this._formElement.querySelectorAll(this._config.selectorForm));
    this._spanErrors = Array.from(this._formElement.querySelectorAll(`.${this._config.classError}`));
    this._popupSetErrors = Array.from(this._formElement.querySelectorAll(this._config.selectorForm));
  }

  _showInputError = (inputElement) => { // show classError input local method
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.classInputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.classError);
  };

  _hideInputError = (inputElement) => { // close classError input local method
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.classInputError);
    errorElement.classList.remove(this._config.classError);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {  //check obj dom validity
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() { //?all true???? 
    return this._inputForm.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.classInactiveButton);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._config.classInactiveButton);
      this._submitButton.removeAttribute("disabled", true);
    }
  }

  _setEventListeners() { //all Listeners input
    this._toggleButtonState();
    this._inputForm.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  cleanValidationErrors() {
    this._spanErrors.forEach(element => {
      element.textContent = '';
    });

    this._popupSetErrors.forEach(element => {
      element.classList.remove(this._config.classInputError);
    });
  }
}
