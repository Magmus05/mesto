import {Popup} from './Popup.js';
export class PopupWithForm extends Popup{
	constructor(popupSelector, {handleFormSubmit}){
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__text');
	}
	close(){
		super.close();
		this._form.reset();
	}
	_getInputValues(){
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}
	setEventListeners(){
		super.setEventListeners()
		this._form.addEventListener('submit', (evt)=>{
			this._handleFormSubmit(evt, this._getInputValues());
		});
	}

}