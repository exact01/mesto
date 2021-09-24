const popup = document.querySelector(".popup"); // Находим наш попапчик в dom дереве ;) 
const popupEditBtn = document.querySelector(".profile__item-button-edit"); // это кнопочка редактирования профиля в dom дереве
const popupCloseBtn = popup.querySelector(".popup__close"); // это кнопочка закрытия в dom дереве

const formElement = document.querySelector(".popup__form");
const nameInput = document.getElementById("form-title");
const jobInput = document.getElementById("form-subtitle");

const youName = document.querySelector(".profile__title");
const youJob = document.querySelector(".profile__subtitle");

popupEditBtn.addEventListener("click", () => {
  profileSubmitForm(); 
  openPopup();
});

popupCloseBtn.addEventListener("click", closePopup);

function openPopup() {
  // document.addEventListener('click', closePopupByClickOrEsc); не трогать потом пригодится
  // document.addEventListener('keydown', closePopupByClickOrEsc);
  popup.classList.add("popup_opened");
}

function closePopup() {
  // document.removeEventListener('click', closePopupByClickOrEsc); не трогать потом пригодится
  // document.removeEventListener('keydown', closePopupByClickOrEsc);
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

// function closePopupByClickOrEsc(e){
//   if (e.key === "Escape" || e.target === popup){
//     closePopup();
//   }
// }
