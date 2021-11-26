export default class Section {
    constructor({ renderer }, selectorContainer) {
        this._renderer = renderer;
        this._selectorContainer = selectorContainer;
    }

    render(items) {
        items.forEach(element => {
            this._renderer(element);
        });
    }
    addItem(element) {
        this._selectorContainer.append(element);
    }
}

