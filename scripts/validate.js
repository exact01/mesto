//obj setup your selector and class
const config = {
  //selector
  form: '.popup__form',
    submitButton: '.popup__form-submit',
      inputProfile: '.popup__input-profile',
  //class
  inactiveButton: 'popup__submit-button_inactive',
    inputError: 'popup__field-error-inactive',
      error: 'popup__error',
};


const showInputError = (formElement, inputElement, errorMessage) => { // show error input
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.error)
};

const hideInputError = (formElement, inputElement) => { // close error input
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.error);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {  //check obj dom validity
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {  // set all listener for formElement
  const inputList = Array.from(formElement.querySelectorAll(config.inputProfile));
  const buttonElement = formElement.querySelector(config.submitButton);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => { // set all listener for inputElement
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() { // set all listener for submit
  const formList = Array.from(document.querySelectorAll(config.form));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

function hasInvalidInput(inputList) { //?all true????
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButton);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButton);
    buttonElement.removeAttribute('disabled', true);
  }
}
