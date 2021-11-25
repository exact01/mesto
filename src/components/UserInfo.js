export default class UserInfo {
    constructor({ nameSelector, nameJob, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(nameJob);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }
    setUserAvatar({ avatar }) {
        this._avatar.style.backgroundImage = `url(${avatar})`;
    }
    setUserInfo({ name, description }) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}