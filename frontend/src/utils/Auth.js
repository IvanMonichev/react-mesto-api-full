//const BASE_URL = 'https://api.monichev.mesto.nomoredomains.sbs'
const BASE_URL = 'http://localhost:3001'

const handleError = res => {
  console.log(res.ok);
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
    body: JSON.stringify({email, password})
  })
    .then(handleError)
    .then(data => {
      console.log(data);
      if (data) {
        localStorage.setItem('access_token', data.token)
        return data;
      }
    })
}

export const getContent = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(handleError)
    .then(data => data)
}
