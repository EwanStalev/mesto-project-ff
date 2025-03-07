const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(card, onDelete) {
  const clone = cardTemplate.cloneNode(true);
  const cardImg = clone.querySelector(".card__image");
  const cardDeleteBtn = clone.querySelector(".card__delete-button");
  const cardTitle = clone.querySelector(".card__title");

  cardImg.src = card.link;
  cardTitle.innerText = card.name;
  cardDeleteBtn.addEventListener("click", onDelete);

  return clone;
}

function deleteCard(event) {
  const target = event.target;
  const cardItem = target.closest(".card");
  cardItem.remove();
}

initialCards.forEach((card) => {
  const clone = createCard(card, deleteCard);
  placesList.append(clone);
});
