export class FormValidator {
	constructor(data, formElement){
		this._submitButtonSelector = data.submitButtonSelector;
		this._inactiveButtonClass = data.inactiveButtonClass;
		this._inputErrorClass = data.inputErrorClass;
		this._errorClass = data.errorClass;
		this._inputSelector = data.inputSelector;
		this._formElement = formElement;
	}
	enableValidation(){
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState()
		this._inputList.forEach(inputElement =>{
			inputElement.addEventListener('input', ()=>{
				this._checkInputValidity(inputElement);
				this._toggleButtonState()
			})
		})
	}
	_checkInputValidity(inputElement){
		const errorTextElement = this._formElement.querySelector(`${this._inputErrorClass}${inputElement.name}-error`)
		if(!inputElement.validity.valid){
			this._showInputError(inputElement, errorTextElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement, errorTextElement);
		}
	}
	_toggleButtonState(){
		if(!this._hasInvalidInput(this._inputList)){
			this._enableButton();
		} else {
			this.disableButton();
		}
	}
	_hasInvalidInput(){
		return this._inputList.some(input => !input.validity.valid);
	}
	_showInputError(inputElement, errorTextElement, validationMessage){
		errorTextElement.textContent = validationMessage;
		inputElement.classList.add(this._errorClass);
	}
	_hideInputError(inputElement, errorTextElement){
		errorTextElement.textContent = '';
		inputElement.classList.remove(this._errorClass);
	}
	_enableButton(){
		this._submitButton.classList.remove(this._inactiveButtonClass);
		this._submitButton.disabled = false;
	}
	disableButton(){
		console.log(this._submitButton);
		this._submitButton.classList.add(this._inactiveButtonClass);
		this._submitButton.disabled = true;
	}
}
