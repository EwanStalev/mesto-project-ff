const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "b68e3149-23e9-427f-8aa0-207c268d59ed",
    "Content-Type": "application/json",
  },
};
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};

const getAllCards = () => {
  return fetch(`${apiConfig.baseURL}/cards`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};

const editUserInfo = ({ name, about }) => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
};

const createNewCard = ({ name, link }) => {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

const deleteCardById = ({ cardId }) => {
  return fetch(`${apiConfig.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse);
};

const likeCardById = ({ cardId }) => {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(handleResponse);
};

const unlikeCardById = ({ cardId }) => {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse);
};

const editUserAvatar = ({ avatar }) => {
  return fetch(`${apiConfig.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleResponse);
};

export {
  getUserInfo,
  getAllCards,
  createNewCard,
  deleteCardById,
  likeCardById,
  unlikeCardById,
  editUserAvatar,
  editUserInfo,
};
