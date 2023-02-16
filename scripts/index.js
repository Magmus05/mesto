let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_profession');

function popupOpened(){
	popup.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
}
function popupClosed(){
	popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	popupClosed();
}

formElement.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', popupClosed);


editButton.addEventListener('click', popupOpened);
