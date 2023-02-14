let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');

function popupOpened(){
	popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpened);

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupButtonSave = document.querySelector('.popup__button');
let nameInput = document.querySelector('.popup__name-Input');
let jobInput = document.querySelector('.popup__job-Input');
nameInput.value = profileName.textContent;
jobInput.value = profileProfession.textContent;

function saveValue() {
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	popup.classList.remove('popup_opened');
}

popupButtonSave.addEventListener('click', saveValue);


function popupClosed(){
	popup.classList.remove('popup_opened');
	}


popupClose.addEventListener('click', popupClosed);





