import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, cardName, cardLink, createButton, nameInput, jobInput, editButton, formEditProfile, formElementCreate, popupImage, data} from '../utils/constants.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

const formEditProfileValidation = new FormValidator (data, formEditProfile);
formEditProfileValidation.enableValidation();
const formElementCreateValidation= new FormValidator (data, formElementCreate);
formElementCreateValidation.enableValidation();


const cardList = new Section({
	//items: initialCards,
	renderer: (item)=>{
		const cardfromCreate = new Card(item, '.cardTemplate', openClickedPicture);
		const cardElement = cardfromCreate.createNewCard();
		cardList.addItem(cardElement);
	}
},'.elements');
cardList.renderer(initialCards);

const popupOpenImage = new PopupWithImage('.popup-foto_type_foto', popupImage);
function openClickedPicture(name, link){
	popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();

const formCreateCardSubmit = new PopupWithForm(
	'.popup_type_createCard',
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		cardList.renderer([newData]);
		formCreateCardSubmit.close();
	}}
	 );
	 formCreateCardSubmit.setEventListeners();
	 function openPopupCreateCard (){
		formCreateCardSubmit.open();
		formElementCreateValidation.disableButton();
	}
createButton.addEventListener('click', openPopupCreateCard); 
const userData = new UserInfo('.profile__name', '.profile__profession');

export function openPopupdEditProfile(){
	formEditProfileSubmit.open();
	nameInput.value = userData.getUserInfo().name;
	jobInput.value = userData.getUserInfo().profession;
	formEditProfileValidation.disableButton();
}

const formEditProfileSubmit = new PopupWithForm(
	'.popup_type_editProfile',
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		userData.setUserInfo(newData.name, newData.profession)
		formEditProfileSubmit.close();
	}}
	 );

formEditProfileSubmit.setEventListeners();
editButton.addEventListener('click', openPopupdEditProfile);

