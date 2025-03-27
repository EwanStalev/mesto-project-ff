const popups = document.querySelectorAll(".popup");

function openModal(popup) {
  if (!popup) {
    return;
  }
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscapeClose);
}

function closeModal(popup) {
  if (!popup) {
    return;
  }
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(evt) {
  if (evt.key == "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

export { openModal, closeModal };
