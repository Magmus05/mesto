export class FormValidator {
	constructor(data, inputSelector){
		this._formElement = data.formElement;
		this._submitButtonSelector = data.submitButtonSelector;
		this._inactiveButtonClass = data.inactiveButtonClass;
		this._inputErrorClass = data.inputErrorClass;
		this._errorClass = data.errorClass;
		this._inputSelector = inputSelector;
	}
	enableValidation(){
		const formList = Array.from(document.querySelectorAll(this._formElement));
		formList.forEach(formElement => {
			formElement.addEventListener('submit', evt => {
				evt.preventDefault();
				this._disableButton(evt.submitter);
			})
	
			this._setEventListeners(formElement)
		})
	}
	_setEventListeners(formElement){
		const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
		const submitButton = formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState(submitButton, inputList)
		inputList.forEach(inputElement =>{
			inputElement.addEventListener('input', ()=>{
				this._checkInputValidity(inputElement);
				this._toggleButtonState(submitButton, inputList)
			})
		})
	}
	_checkInputValidity(inputElement){
		const errorTextElement = document.querySelector(`${this._inputErrorClass}${inputElement.name}-error`)
		if(!inputElement.validity.valid){
			this._showInputError(inputElement, errorTextElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement, errorTextElement);
		}
	}
	_toggleButtonState(submitButton, inputList){
		if(!this._hasInvalidInput(inputList)){
			this._enableButton(submitButton, this._inactiveButtonClass);
		} else {
			this._disableButton(submitButton, this._inactiveButtonClass);
		}
	}
	_hasInvalidInput(inputList){
		return inputList.some(input => !input.validity.valid);
	}
	_showInputError(inputElement, errorTextElement, validationMessage){
		errorTextElement.textContent = validationMessage;
		inputElement.classList.add(this._errorClass);
	}
	_hideInputError(inputElement, errorTextElement){
		errorTextElement.textContent = '';
		inputElement.classList.remove(this._errorClass);
	}
	_enableButton(submitButton, inactiveButtonClass){
		submitButton.classList.remove(inactiveButtonClass);
		submitButton.disabled = false;
	}
	_disableButton(submitButton, inactiveButtonClass){
		submitButton.classList.add(inactiveButtonClass);
		submitButton.disabled = true;
	}
}
