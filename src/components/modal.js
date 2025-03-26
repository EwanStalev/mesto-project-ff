function openModal(popup) {
  if (!popup) {
    return;
  }
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  if (!popup) {
    return;
  }
  popup.classList.remove("popup_is-opened");
}
export { openModal, closeModal };
