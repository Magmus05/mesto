export class Section {
	constructor({ renderer}, containerSelector){
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
	}
	renderer(items){
		items.reverse().forEach((item) => {
      this._renderer(item);
    });
	}
	addItem(element){
		this._container.prepend(element);
	}
}