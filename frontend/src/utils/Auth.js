export const BASE_URL = 'https://api.project-mesto72.nomoredomains.xyz';
// export const BASE_URL = 'http://localhost:3001';

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    console.log(data.error)
    throw new Error(data.error);
  });
};

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    //   "Authorization" : `Bearer ${token}`
    // },
  }).then(_checkResponse);
}
