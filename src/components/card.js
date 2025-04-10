import { deleteCardById, likeCardById, unlikeCardById } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, showImg, userId) {
  const isOwner = userId === card.owner._id;
  const isLike = card.likes.some((like) => like._id === userId);
  const clone = cardTemplate.cloneNode(true);
  const cardImg = clone.querySelector(".card__image");
  const cardDeleteBtn = clone.querySelector(".card__delete-button");
  const cardTitle = clone.querySelector(".card__title");
  const cardLikeBtn = clone.querySelector(".card__like-button");
  const cardLikeCounter = clone.querySelector(".card__like-counter");

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  cardDeleteBtn.addEventListener("click", (evt) => deleteCard(evt, card));
  cardLikeBtn.addEventListener("click", (evt) =>
    handleLike(evt, card, cardLikeCounter)
  );
  cardImg.addEventListener("click", () => showImg(card));

  if (!isOwner) {
    cardDeleteBtn.remove();
  }
  if (isLike) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  return clone;
}

function deleteCard(event, card) {
  deleteCardById({ cardId: card._id })
    .then(() => {
      const target = event.target;
      const cardItem = target.closest(".card");
      cardItem.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleLike(event, card, counter) {
  const target = event.target;
  const isLike = target.classList.contains("card__like-button_is-active");
  if (isLike) {
    unlikeCardById({ cardId: card._id })
      .then((newCard) => {
        target.classList.remove("card__like-button_is-active");
        counter.textContent = newCard.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    likeCardById({ cardId: card._id })
      .then((newCard) => {
        target.classList.add("card__like-button_is-active");
        counter.textContent = newCard.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export { createCard };
