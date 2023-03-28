export const BASE_URL = 'http://localhost:3000';

// Обработка ответа с сервера
function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(res);
}

// Регистрация нового пользователя
export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => handleResponse(res));
};

// Авторизация пользователя
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => handleResponse(res));
};

// Проверка токена
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};

// Получение постов
export const getPosts = (token) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};

// Публикация поста
export const createPost = (post, token) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then((res) => handleResponse(res));
};

// Редактирование поста
export const editPost = (post, token) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then((res) => handleResponse(res));
};

// Удаление поста
export const deletePost = (postId, token) => {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};
