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
		cardList.addItem(cardElement)
	}
},'.elements');
cardList.renderer(initialCards) // как ещё можно передать уникальные данные для добавления карточек, и при этом только один раз вызвать класс, я не понимаю, если то не верно, то разъясните подробней пожалуйста , как это требуется сделать.

const popupOpenImage = new PopupWithImage('.popup-foto_type_foto', popupImage);
function openClickedPicture(name, link){
	popupOpenImage.open(name, link);  // аналогично верхнего коммента
}

const formCreateCardSubmit = new PopupWithForm(
	'.popup_type_createCard',
	cardName, 
	cardLink, 
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		cardList.renderer([newData]);
		formCreateCardSubmit.close();
		evt.target.reset();
		formElementCreateValidation.disableButton();
	}}
	 );
	 formCreateCardSubmit.setEventListeners();
	 function openPopupCreateCard (){
		formCreateCardSubmit.open()
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
	nameInput,
	jobInput,
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		userData.setUserInfo(newData.name, newData.profession)
		formEditProfileSubmit.close();
	}}
	 );

formEditProfileSubmit.setEventListeners();
editButton.addEventListener('click', openPopupdEditProfile);

