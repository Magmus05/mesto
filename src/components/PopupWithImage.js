import {Popup} from './Popup.js';
export class PopupWithImage extends Popup{
	constructor(popupSelector, popupImage){
		super(popupSelector);
		this._popupImage = popupImage;
		this._nameImgFromPopupFoto = document.querySelector('.popup-foto__image-name');
	}
	open(name, link){
		super.open()
		this._popupImage.setAttribute('src', link);
		this._popupImage.setAttribute('alt', `Фотография: ${name}.`);
		this._nameImgFromPopupFoto.textContent = name;
		super.setEventListeners();
	}
}