export class Api {
  constructor(configuration) {
    this._url = configuration.url
    this._headers = configuration.headers
  }

  _errorHandle(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка № ${res.status} (${res.ok})`)
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._errorHandle)
  }

  setUserInfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then(this._errorHandle)
  }

  getCardsData() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._errorHandle)
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._errorHandle)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
      })
      .then(this._errorHandle)
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers
    })
      .then(this._errorHandle)
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
      .then(this._errorHandle)
  }

  editAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
      .then(this._errorHandle)
  }

  getAllData() {
    return Promise.all([this.getUserData(), this.getCardsData()]);
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.likeCard(id);
    } else {
      return this.dislikeCard(id)
    }
  }

}

const api = new Api({
  url: 'http://localhost:3001',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
})

export default api;
