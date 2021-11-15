export default class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._itemsRender = items;
        this._renderer = renderer;
        this._selectorContainer = selectorContainer;
    }

    render() {
        this._itemsRender.forEach(element => {
            this._renderer(element);
        });
    }
    addItem(element) {
        this._selectorContainer.prepend(element);
    }
}

