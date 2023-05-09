import {Popup} from './Popup.js';
export class PopupWithConfirm extends Popup{
	constructor(popupSelector){
		super(popupSelector);
		this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
	}

	setEventListeners(){
		super.setEventListeners()
		this._form.addEventListener('submit', (evt)=>{
			this._handleFormSubmit(evt);
		});
	}
	setSubmitFunction(functionDelete){
		this._handleFormSubmit = functionDelete;
	}
}
