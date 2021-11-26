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
        if (avatar) {
            this._avatar.style.backgroundImage = `url(${avatar})`;
        }
        else {
            console.log("Ошибка установления аватарки")
        }
    }
    setUserInfo({ name, description }) {
        if (name) {
            this._name.textContent = name;
        }
        else {
            console.log("Ошибка, неудалось установить имя профиля")
        }
        if (description) {
            this._description.textContent = description;
        }
        else {
            console.log("Ошибка, неудалось установить статус")
        }
    }
}