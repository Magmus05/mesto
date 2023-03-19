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

function setEventListeners(inputList, submitButton, config){
	config.formElement.addEventListener('submit', evt => {
		evt.preventDefault();
	})

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () =>{
			checkInputValidity(inputElement, config.inputErrorClass, config.errorClass);
			toggleButtonState(submitButton, config.inactiveButtonClass, inputList);
		})
	})
}

function enableValidation(config){
	const inputList = Array.from(config.formElement.querySelectorAll(config.inputSelector));
	const submitButton = config.formElement.querySelector(config.submitButtonSelector);
	submitButton.classList.add(config.inactiveButtonClass);
	submitButton.disabled = true;
	setEventListeners(inputList, submitButton, config);
}

