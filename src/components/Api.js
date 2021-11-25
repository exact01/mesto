export default class Api {
    constructor(cfgApi) {
        this._url = cfgApi.url;
        this._headers = cfgApi.headers;
        this._post = cfgApi.methods.post;
        this._get = cfgApi.methods.get;
        this._delete = cfgApi.methods.delete;
        this._put = cfgApi.methods.put;
        this._patch = cfgApi.methods.patch;
        this._cards = cfgApi.requests.cards;
        this._users = cfgApi.requests.users;
        this._me = cfgApi.requests.me;
        this._likes = cfgApi.requests.likes;
        this._avatar = cfgApi.requests.avatar;
    }

    _checkAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}${this._cards}`, {
            headers: this._headers
        })
            .then(this._checkAnswer);
    }

    getUserProfile() {
        return fetch(`${this._url}${this._users}${this._me}`, {
            headers: this._headers
        })
            .then(this._checkAnswer);
    }

    setUserProfile(data) {
        return fetch(`${this._url}${this._users}${this._me}`, {
            method: this._patch,
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(this._checkAnswer);
    }

    getNewCard(data) {
        return fetch(`${this._url}${this._cards}`, {
            method: this._post,
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkAnswer);
    }

    deleteCard(id) {
        return fetch(`${this._url}${this._cards}/${id}`, {
            method: this._delete,
            headers: this._headers
        })
            .then(this._checkAnswer);
    }

    addLike(id) {
        return fetch(`${this._url}${this._cards}${this._likes}/${id}`, {
            method: this._put,
            headers: this._headers
        })
            .then(this._checkAnswer);
    }

    deleteLike(id) {
        return fetch(`${this._url}${this._cards}${this._likes}/${id}`, {
            method: this._delete,
            headers: this._headers
        })
            .then(this._checkAnswer);
    }

    updateAvatar(avatar) {
        return fetch(`${this._url}${this._users}${this._me}${this._avatar}`, {
            method: this._patch,
            headers: this._headers,
            body: JSON.stringify({ avatar })
        })
            .then(this._checkAnswer);
    }
}