import { BASE_URL } from "./Auth";

class Api {
  constructor(server, options) {
    this.options = options;
    this.server = server;
  }

  getProfileData() {
    return fetch(`${this.server}/users/me`, {
      headers: this.options.headers,     
      credentials: 'include',
    }).then(
      this._checkResponse
    );
  }

  getCards() {
    return fetch(`${this.server}/cards`, {
      headers: this.options.headers,     
      credentials: 'include',
    }).then(
      this._checkResponse
    );
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.server}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this.options.headers,     
        credentials: 'include',
        // headers: {
        //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        //   'Content-Type': 'application/json',
        // },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this.server}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this.options.headers,     
        credentials: 'include',
        // headers: {
        //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        //   'Content-Type': 'application/json',
        // },
      }).then(this._checkResponse);
    }
  }

  editProfile(data) {
    return fetch(`${this.server}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,      
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this.server}/cards`, {
      method: 'POST',
      headers: this.options.headers,     
      credentials: 'include',
      // headers: {
      //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.server}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,     
      credentials: 'include',
      // headers: {
      //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
      //   'Content-Type': 'application/json',
      // },
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.server}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.options.headers,     
      credentials: 'include',
      // headers: {
      //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
      //   'Content-Type': 'application/json',
      // },
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.server}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.options.headers,     
      credentials: 'include',
      // headers: {
      //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
      //   'Content-Type': 'application/json',
      // },
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this.server}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,     
      credentials: 'include',
      // headers: {
      //   authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  rebderError(err) {
    console.log(`Ошибка: ${err}`);
  }
}

export const api = new Api(BASE_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
// export const api = new Api('http://localhost:3001', {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
