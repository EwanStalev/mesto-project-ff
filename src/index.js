import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const previewImg = document.querySelector(".popup__image");
const previewCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImg = document.querySelector(".popup_type_image");
const editProfileForm = document.querySelector("form[name='edit-profile']");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector("form[name='new-place']");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardUrl = document.querySelector(".popup__input_type_url");

profileAddBtn.addEventListener("click", () => openModal(popupNewCard));

profileEditBtn.addEventListener("click", () => {
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});



editProfileForm.addEventListener("submit", handleEditFormSubmit);

newPlaceForm.addEventListener("submit", handleCardFormSubmit);

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = inputName.value;
  const jobValue = inputDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}

function showImg(card) {
  previewImg.src = card.link;
  previewImg.alt = `Фотография места: ${card.name}`;
  previewCaption.textContent = card.name;

  openModal(popupImg);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const clone = createCard(
    { name: inputCardName.value, link: inputCardUrl.value },
    deleteCard,
    likeCard,
    showImg
  );

  placesList.prepend(clone);

  newPlaceForm.reset();

  closeModal(popupNewCard);
}

initialCards.forEach((card) => {
  const clone = createCard(card, deleteCard, likeCard, showImg);

  placesList.append(clone);
});
