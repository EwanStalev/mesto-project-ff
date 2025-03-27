const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, onDelete, onLike, showImg) {
  const clone = cardTemplate.cloneNode(true);
  const cardImg = clone.querySelector(".card__image");
  const cardDeleteBtn = clone.querySelector(".card__delete-button");
  const cardTitle = clone.querySelector(".card__title");
  const cardLikeBtn = clone.querySelector(".card__like-button");

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  
  cardDeleteBtn.addEventListener("click", onDelete);
  cardLikeBtn.addEventListener("click", onLike);
  cardImg.addEventListener("click", () => showImg(card));

  return clone;
}

function deleteCard(event) {
  const target = event.target;
  const cardItem = target.closest(".card");
  cardItem.remove();
}

function likeCard(event) {
  const target = event.target;
  target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
