function showInputError(inputElement, errorTextElement, validationMessage, errorClass){
	errorTextElement.textContent = validationMessage;
	inputElement.classList.add(errorClass);
}
function hideInputError(inputElement, errorTextElement, errorClass){
	errorTextElement.textContent = '';
	inputElement.classList.remove(errorClass);
}
function enableButton(submitButton, inactiveButtonClass){
	submitButton.classList.remove(inactiveButtonClass);
	submitButton.disabled = false;
}
function disableButton(submitButton, inactiveButtonClass){
	submitButton.classList.add(inactiveButtonClass);
	submitButton.disabled = true;
}

function hasInvalidInput(inputList){
return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(submitButton, inactiveButtonClass, inputList){
	if(!hasInvalidInput(inputList)){
		enableButton(submitButton, inactiveButtonClass);
	} else {
		disableButton(submitButton, inactiveButtonClass);
	}
}

function checkInputValidity(inputElement, inputErrorClass, errorClass){
	const errorTextElement = document.querySelector(`${inputErrorClass}${inputElement.name}-error`)
	if(!inputElement.validity.valid){
		showInputError(inputElement, errorTextElement, inputElement.validationMessage, errorClass);
	} else {
		hideInputError(inputElement, errorTextElement, errorClass);
	}
}

function setEventListeners(formElement, config){
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const submitButton = formElement.querySelector(config.submitButtonSelector);
	toggleButtonState(submitButton, config.inactiveButtonClass, inputList)
	inputList.forEach(inputElement =>{
		inputElement.addEventListener('input', ()=>{
			checkInputValidity(inputElement, config.inputErrorClass, config.errorClass);
			toggleButtonState(submitButton, config.inactiveButtonClass, inputList)
		})
	})
}

function enableValidation(config){
	const formList = Array.from(document.querySelectorAll(config.formElement));
	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault();
			disableButton(evt.submitter, config.inactiveButtonClass);
		})

		setEventListeners(formElement, config)
	})
}

enableValidation({
	formElement: '.popup__form',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: '.popup__span_type_',
	errorClass: 'popup__text_error'
})