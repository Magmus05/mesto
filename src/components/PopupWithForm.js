import {Popup} from './Popup.js';
export class PopupWithForm extends Popup{
	constructor(popupSelector, inputOne, inputTwo, {handleFormSubmit}){
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
		this._inputOne = inputOne;
		this._inputTwo = inputTwo;
	}
	close(){
		super.close();
		this._form.reset();
	}
	_getInputValues(){
		this._inputList = this._form.querySelectorAll('.popup__text');
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

		// this._button.addEventListener('click', ()=>{
		// 	this.open()
		// }); 
	// 	} else{
	// 		this._button.addEventListener('click', openPopupdEditProfile); 
	// 	}
	}

}