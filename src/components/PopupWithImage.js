import {Popup} from './Popup.js';
export class PopupWithImage extends Popup{
	constructor(popupSelector, name, link, popupImage){
		super(popupSelector);
		this._popup = document.querySelector(this._popupSelector);
		this._popupImage = popupImage;
		this._name = name;
		this._link = link;
	}
	open(){
		this._popup.classList.add('popup_opened');
		this._popupImage.setAttribute('src', this._link);
		this._popupImage.setAttribute('alt', `Фотография: ${this._name}.`);
		super._handleEscClose();
		super.setEventListeners();
	}

}