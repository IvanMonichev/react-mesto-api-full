const BASE_URL = 'https://api.monichev.mesto.nomoredomains.sbs'


const handleError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка № ${res.status} – ${res.statusText}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
    .then(handleError)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
    .then(handleError)
    .then(data => {
      if (data) {
        return data;
      }
    })
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleError)
    .then(data => data)
}
