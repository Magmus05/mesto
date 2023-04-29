export class Popup{
	constructor(popupSelector){
		this._popupSelector = popupSelector;
		this._popup = document.querySelector(this._popupSelector);
	}
	open(){
		this._popup.classList.add('popup_opened');
		this._handleEscClose();
		this.setEventListeners();
	}
	close(){
		this._popup.classList.remove('popup_opened');
	}
	_handleEscClose(){
		document.addEventListener('keydown', evt=>{
			if (evt.key === 'Escape') {
				this.close();
			}
		});
	}
	setEventListeners(){
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