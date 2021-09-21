const popup = document.querySelector(".popup");
const popupEditBtn = document.querySelector(".profile_open_popup");
const popupCloseBtn = popup.querySelector(".popup__close");

let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input-name");
let jobInput = formElement.querySelector(".popup__input-surname");

let youName = document.querySelector(".profile__title");
let youJob = document.querySelector(".profile__subtitle");

popupEditBtn.addEventListener("click",  openPopup);
popupCloseBtn.addEventListener("click", closePopup);


function openPopup() {
  profileSubmitForm();
  document.addEventListener('click', closePopupByClickOrEsc);
  document.addEventListener('keydown', closePopupByClickOrEsc);
  popup.classList.add("popup_opened");
}

function closePopup() {
  document.removeEventListener('click', closePopupByClickOrEsc);
  document.removeEventListener('keydown', closePopupByClickOrEsc);
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  youName.textContent = nameInput.value;
  youJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

function profileSubmitForm() {
  nameInput.value = youName.textContent;
  jobInput.value = youJob.textContent;
}

function closePopupByClickOrEsc(e){
  if (e.key === "Escape" || e.target === popup){
    closePopup();
  }
}
