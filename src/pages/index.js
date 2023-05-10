import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {createButton,editButton, editButtonProfileAvatar, formElementAvatar, formEditProfile, formElementCreate, popupImage, data, optionsFromApi} from '../utils/constants.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';

const formEditProfileValidation = new FormValidator (data, formEditProfile);
formEditProfileValidation.enableValidation();
const formElementCreateValidation= new FormValidator (data, formElementCreate);
formElementCreateValidation.enableValidation();
const formUpdateAvatarValidation= new FormValidator (data, formElementAvatar);
formUpdateAvatarValidation.enableValidation();
const api = new Api(optionsFromApi);


// Лайки карточек
function putLikeCard(cardId, card){
	api.putLikeCard(cardId)
	.then(result=> {
		card.putLike(result.likes.length)
	})
	.catch((err)=> console.log(`Ошибка ${err}`)) 
}
function deleteLikeCard(cardId, card){
	api.deleteLikeCard(cardId)
	.then(result=> {
		card.deleteLike(result.likes.length)
	})
	.catch((err)=> console.log(`Ошибка ${err}`))
}


// Удаление карточки
function openPopupDelete(cardId, card){
	popupDeleteCard.open();
	popupDeleteCard.setSubmitFunction((evt)=>{
		evt.preventDefault();
		evt.submitter.textContent = 'Удаляется...';
		api.deleteMyCard(cardId)
		.then(()=>{
		card.deleteCard();
		popupDeleteCard.close();
		})
		.catch((err)=> console.log(`Ошибка ${err}`))
		.finally(()=>evt.submitter.textContent = 'Да');
		})
}
const popupDeleteCard = new PopupWithConfirm('.popup_type_deletCard') 
popupDeleteCard.setEventListeners();

function createCard(item) {
	const card = new Card(item, '.cardTemplate', openClickedPicture, openPopupDelete, putLikeCard, deleteLikeCard, userData.getUserID());
	const cardElement = card.createNewCard();
	return cardElement
}

const cardList = new Section({
	renderer: (item)=>{
		cardList.addItem(createCard(item));
	}
},'.elements');

const popupOpenImage = new PopupWithImage('.popup-foto_type_foto', popupImage);
function openClickedPicture(name, link){
	popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();

// создание новой карточки
const formCreateCardSubmit = new PopupWithForm(
	'.popup_type_createCard',
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		//evt.submitter.textContent = 'Создание...';
		return api.addNewCard(newData)
		.then(res=> {
			cardList.renderer([res]);
		})
		.catch((err)=> console.log(`Ошибка ${err}`))
		//.finally(()=>evt.submitter.textContent = 'Создать');
	}}
	 );
formCreateCardSubmit.setEventListeners();

function openPopupCreateCard (){
formCreateCardSubmit.open();
formElementCreateValidation.disableButton();
}
createButton.addEventListener('click', openPopupCreateCard); 

// Загрузка начальных данных
Promise.all([api.getUserInformation(), api.getInitialCards()])
.then(intialData=>{
	userData.setUserInfo(intialData[0]);
	cardList.renderer(intialData[1]);
})
.catch((err)=> console.log(`Ошибка ${err}`))


// Редактирование профайла
const userData = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar-image');

export function openPopupdEditProfile(){
	formEditProfileSubmit.open();
	formEditProfileSubmit.setInputValues(userData.getUserInfo())
	formEditProfileValidation.disableButton();
}

const formEditProfileSubmit = new PopupWithForm(
	'.popup_type_editProfile',
	{handleFormSubmit: (evt, newData)=>{
		evt.preventDefault();
		//evt.submitter.textContent = 'Сохранение...';
		return api.editProfileData(newData.name, newData.profession)
		.then(res=> {
			userData.setUserInfo(res);
		})
		.catch((err)=> console.log(`Ошибка ${err}`))
		//.finally(()=>evt.submitter.textContent = 'Сохранить');
	}}
	 );

formEditProfileSubmit.setEventListeners();
editButton.addEventListener('click', openPopupdEditProfile);

// Смена Аватара
const formUpdateAvatarSubmit = new PopupWithForm(
	'.popup_type_newAvatar',
	{handleFormSubmit: (evt, avatarLink)=>{
		evt.preventDefault();
		//evt.submitter.textContent = 'Сохранение...';
		return api.updateAvatar(avatarLink.link)
		.then(res=> {
			userData.setUserInfo(res);
			//formUpdateAvatarSubmit.close();
		})
		.catch((err)=> console.log(`Ошибка ${err}`))
		//.finally(()=>evt.submitter.textContent = 'Сохранить');
	}}
	 );

function openPopupUpdateAvatar(){
	formUpdateAvatarSubmit.open()
	formUpdateAvatarValidation.disableButton();
}
formUpdateAvatarSubmit.setEventListeners();
editButtonProfileAvatar.addEventListener('click', openPopupUpdateAvatar)

