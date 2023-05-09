import {Popup} from './Popup.js';
export class PopupWithForm extends Popup{
	constructor(popupSelector, {handleFormSubmit}){
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__text');
		this._submitButton = this._form.querySelector('.popup__button')
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
	setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
      // перед запросом сохраняем изначальный текст кнопки
      const initialText = this._submitButton.textContent;
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(evt,this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

	// setEventListeners(){
	// 	super.setEventListeners()
	// 	this._form.addEventListener('submit', (evt)=>{
	// 		this._handleFormSubmit(evt, this._getInputValues());
	// 	});
	// }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }
}