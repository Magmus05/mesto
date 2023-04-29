import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, cardName, cardLink, createButton, nameInput, jobInput, editButton, formEditProfile, formElementCreate, popupImage, nameImagePopupFoto, data} from '../utils/constants.js'
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

const popupEditProfile = new Popup('.popup_type_editProfile');
const formEditProfileValidation = new FormValidator (data, formEditProfile);
formEditProfileValidation.enableValidation();
const formElementCreateValidation= new FormValidator (data, formElementCreate);
formElementCreateValidation.enableValidation();

function addCard(dataCard){
	const cardList = new Section({
		items: dataCard,
		renderer: (item)=>{
			const cardfromCreate = new Card(item, '.cardTemplate', openClickedPicture);
			const cardElement = cardfromCreate.createNewCard();
			cardList.addItem(cardElement)
		}
	},'.elements');
	cardList.renderer();
}
addCard(initialCards)

function openClickedPicture(name, link){
	const popupOpenImage = new PopupWithImage('.popup-foto_type_foto', name, link,popupImage);
	popupOpenImage.open();
	nameImagePopupFoto.textContent = name;
}

const formCreateCardSubmit = new PopupWithForm(
	'.popup_type_createCard',
	createButton,
	cardName, 
	cardLink, 
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		const newDataForCard = [{name: newData[0], link: newData[1]}];
		addCard(newDataForCard);
		formCreateCardSubmit.close();
		evt.target.reset();
		formElementCreateValidation.disableButton();
	}}
	 );

	 formCreateCardSubmit.setEventListeners();

const userData = new UserInfo('.profile__name', '.profile__profession');

export function openPopupdEditProfile(){
	popupEditProfile.open();
	nameInput.value = userData.getUserInfo().name;
	jobInput.value = userData.getUserInfo().profession;
	formEditProfileValidation.disableButton();
}

const formEditProfileSubmit = new PopupWithForm(
	'.popup_type_editProfile',
	editButton,
	nameInput,
	jobInput,
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		userData.setUserInfo(newData[0], newData[1])
		formEditProfileSubmit.close();
	}}
	 );
formEditProfileSubmit.setEventListeners();
