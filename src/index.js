import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  createNewCard,
  editUserAvatar,
  editUserInfo,
  getAllCards,
  getUserInfo,
} from "./components/api.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const previewImg = document.querySelector(".popup__image");
const previewCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImg = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_edit-avatar");
const editProfileForm = document.querySelector("form[name='edit-profile']");
const inputName = document.querySelector(".popup__input_type_name");
const inputAvatar = document.querySelector(".popup__input_type_avatar");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const newPlaceForm = document.querySelector("form[name='new-place']");
const editAvatarForm = document.querySelector("form[name='edit-avatar']");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardUrl = document.querySelector(".popup__input_type_url");
let userId = null;

Promise.all([getUserInfo(), getAllCards()]).then(([user, cards]) => {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
  userId = user._id;

  cards.forEach((card) => {
    const clone = createCard(card, showImg, userId);

    placesList.append(clone);
  })
}).catch((error) => {
  console.log(error);
});

profileAddBtn.addEventListener("click", () => openModal(popupNewCard));

profileEditBtn.addEventListener("click", () => {
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, config);
});

profileImage.addEventListener("click", () => {
  openModal(popupAvatar);
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);

newPlaceForm.addEventListener("submit", handleCardFormSubmit);

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const btn = evt.target.querySelector(".popup__button");
  const btnText = btn.textContent;
  btn.textContent = "Сохранение...";

  const avatar = inputAvatar.value;

  editUserAvatar({ avatar })
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      btn.textContent = btnText;
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const btn = evt.target.querySelector(".popup__button");
  const btnText = btn.textContent;
  btn.textContent = "Сохранение...";

  const nameValue = inputName.value;
  const jobValue = inputDescription.value;

  editUserInfo({ name: nameValue, about: jobValue })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;

      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      btn.textContent = btnText;
    });
}

function showImg(card) {
  previewImg.src = card.link;
  previewImg.alt = `Фотография места: ${card.name}`;
  previewCaption.textContent = card.name;

  openModal(popupImg);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const btn = evt.target.querySelector(".popup__button");
  const btnText = btn.textContent;
  btn.textContent = "Сохранение...";

  createNewCard({ name: inputCardName.value, link: inputCardUrl.value })
    .then((card) => {
      const clone = createCard(card, showImg, userId);

      placesList.prepend(clone);

      newPlaceForm.reset();

      clearValidation(newPlaceForm, config);

      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      btn.textContent = btnText;
    });
}

enableValidation(config);
