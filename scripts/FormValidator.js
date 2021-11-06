//obj setup your selector and class
export const config = {
  //selector
  form: '.popup__input-profile',
    submitButton: '.popup__form-submit',
      inputProfile: '.popup__input-profile',
  //class
  inactiveButton: 'popup__submit-button_inactive',
    inputError: 'popup__field-error-inactive',
      error: 'popup__error',
};

export class FormValidator {
  constructor(config, formElement){
    this._config = config; //config local 
    this._formElement = formElement;
    this._submitButton = this._config.submitButton;
    this._inputForm = Array.from(this._formElement.querySelectorAll(this._config.form));
  }

  _showInputError = (inputElement) => { // show error input local method
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.error);
  };

  _hideInputError = (inputElement) => { // close error input local method
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputError);
    errorElement.classList.remove(this._config.error);
    errorElement.textContent = '';
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
      this._formElement.querySelector(this._submitButton).classList.add(this._config.inactiveButton);
      this._formElement.querySelector(this._submitButton).setAttribute('disabled', true);
    } else {
      this._formElement.querySelector(this._submitButton).classList.remove(this._config.inactiveButton);
      this._formElement.querySelector(this._submitButton).removeAttribute('disabled', true);
    }
  }

  _setEventListeners() { //all Listeners input
    this._toggleButtonState();
    this._inputForm.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }

  enableValidation(){
    this._setEventListeners();
  }

}
