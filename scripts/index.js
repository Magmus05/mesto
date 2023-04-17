import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_editProfile');
const formEditProfile = document.forms['editProfile'];
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = popupEditProfile.querySelector('.popup__text_type_name');
const jobInput = popupEditProfile.querySelector('.popup__text_type_profession');
const createButton = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_createCard');
const formElementCreate = document.forms['createProfile'];
const cardName = popupCreateCard.querySelector('.popup__text_type_name-card');
const cardLink = popupCreateCard.querySelector('.popup__text_type_link-card');
const popupImage = document.querySelector('.popup-foto__image');
const popupOpenImage = document.querySelector('.popup-foto_type_foto');
const nameImagePopupFoto = document.querySelector('.popup-foto__image-name');
const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.elements');
const data = {
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: '.popup__span_type_',
	errorClass: 'popup__text_error',
	inputSelector: '.popup__text'
}
const formEditProfileValidation = new FormValidator (data, formEditProfile);
formEditProfileValidation.enableValidation();
const formElementCreateValidation= new FormValidator (data, formElementCreate);
formElementCreateValidation.enableValidation();

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openClickedPicture(name, link){
	openPopup(popupOpenImage)
	popupImage.setAttribute('src', link);
	popupImage.setAttribute('alt', `Фотография: ${name}.`);
	nameImagePopupFoto.textContent = name;
}
function createCard (link, name, Template, openClickedPicture) {
	const cardFromArray = new Card(link, name, Template, openClickedPicture);
	cardsContainer.prepend(cardFromArray.createCard());
}
initialCards.forEach(card => {
	createCard(card.link, card.name, '.cardTemplate', openClickedPicture)
})

function handleFormCreateSubmit (evt) {
	evt.preventDefault();
	const cardfromCreate = new Card(cardLink.value, cardName.value, '.cardTemplate', openClickedPicture)
	cardsContainer.prepend(cardfromCreate.createCard());
	closePopup(popupCreateCard);
	evt.target.reset();
	formElementCreateValidation.disableButton();  // деактивировать кнопку
}

function openPopupCreateCard(){ 
	openPopup(popupCreateCard);
}

formElementCreate.addEventListener('submit', handleFormCreateSubmit);
createButton.addEventListener('click', openPopupCreateCard);  //Нажатие кнопки СОЗДАТЬ

popups.forEach(popup =>{
	popup.addEventListener('mousedown', (evt)=>{
		if(evt.target.classList.contains('popup_opened')){
			closePopup(popup)
		}
		if (evt.target.classList.contains('popup-close-button')) {
			closePopup(popup)
		}
	})
})

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup){
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape); 
}
function closePopup(popup){
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape); 
}

// Редактирование профиля
function openPopupdEditProfile(){
	openPopup (popupEditProfile)
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
}
function closePopupEditProfile(){
	closePopup (popupEditProfile);
}
function handleFormEditSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	closePopupEditProfile();
	formEditProfileValidation.disableButton();
}
formEditProfile.addEventListener('submit', handleFormEditSubmit);
editButton.addEventListener('click', openPopupdEditProfile); //Нажатие кнопки РЕДАКТИРОВАТЬ