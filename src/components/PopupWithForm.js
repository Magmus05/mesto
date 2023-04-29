import {Popup} from './Popup.js';
import {openPopupdEditProfile} from '../pages/index.js';
import {createButton} from '../utils/constants.js'
export class PopupWithForm extends Popup{
	constructor(popupSelector, button, inputOne, inputTwo, {handleFormSubmit}){
		super(popupSelector);
		this._popup = document.querySelector(this._popupSelector);
		this._handleFormSubmit = handleFormSubmit
		this._form = document.querySelector(this._popupSelector).querySelector('.popup__form')
		this._button = button;
		this._inputOne = inputOne;
		this._inputTwo = inputTwo;
	}
	_getInputValues(){
		return [this._inputOne.value, this._inputTwo.value];

	}
	open(){
		this._popup.classList.add('popup_opened');
		this._handleEscClose();
	}

	setEventListeners(){
		this._form.addEventListener('submit', (evt)=>{
			this._handleFormSubmit(evt, this._getInputValues());
		});

		if(this._button === createButton){
			this._button.addEventListener('click', ()=>{
				this.open()
			}); 
		} else{
			this._button.addEventListener('click', openPopupdEditProfile); 
		}

		this._popup.addEventListener('mousedown', (evt)=>{
			if(evt.target.classList.contains('popup_opened')){
				this.close();
			}
			if (evt.target.classList.contains('popup-close-button')) {
				this.close();
			}
		})
	}

}