import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {createButton, nameInput, jobInput, editButton, editButtonProfileAvatar, formElementAvatar, formEditProfile, formElementCreate, popupImage, data, profileName, profileProfession, profileAvatar, deleteCardButton} from '../utils/constants.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Popup} from '../components/Popup.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

const formEditProfileValidation = new FormValidator (data, formEditProfile);
formEditProfileValidation.enableValidation();
const formElementCreateValidation= new FormValidator (data, formElementCreate);
formElementCreateValidation.enableValidation();
const formUpdateAvatarValidation= new FormValidator (data, formElementAvatar);
formUpdateAvatarValidation.enableValidation();

// Лайки карточек
function putLikeCard(cardId, likeElement){
	api.putLikeCard(cardId)
	.then(result=> {
		likeElement.textContent = result.likes.length;
	}); 
}
function deleteLikeCard(cardId, likeElement){
	api.deleteLikeCard(cardId)
	.then(result=> {
		likeElement.textContent = result.likes.length;
	}); 
}

// Удаление карточки
function openPopupDelete(cardId, card){
	popupDeleteCard.open();
	popupDeleteCard.setEventListeners();
	deleteCardButton.addEventListener('submit', (evt)=>{
		evt.preventDefault();
		api.deleteMyCard(cardId);
		card.remove();
		card = null;
		popupDeleteCard.close();
	})
}
const popupDeleteCard = new Popup('.popup_type_deletCard');

// Смена Аватара
const formUpdateAvatarSubmit = new PopupWithForm(
	'.popup_type_newAvatar',
	{handleFormSubmit: (evt, avatarLink)=>{
		evt.preventDefault();
		evt.submitter.textContent = 'Сохранение...';
		api.updateAvatar(avatarLink.link)
		// .then(res=> {
		// 	console.log(res);
		// })
		.finally(()=>evt.submitter.textContent = 'Сохранить');
		formUpdateAvatarSubmit.close();
		profileAvatar.src = avatarLink.link;
	}}
	 );

function openPopupUpdateAvatar(){
	formUpdateAvatarSubmit.open()
	formUpdateAvatarValidation.disableButton();
}
formUpdateAvatarSubmit.setEventListeners();
editButtonProfileAvatar.addEventListener('click', openPopupUpdateAvatar)

// Загрузка информации о пользователе
const api = new Api();
api.getUserInformation()
.then(result=> {
	profileName.textContent = result.name;
	profileProfession.textContent = result.about;
	profileAvatar.src = result.avatar;
});

// Загрузка карточек по умолчанию
api.getInitialCards()
.then(result=> {
	cardList.renderer(result);
});

const cardList = new Section({
	renderer: (item)=>{
		const cardfromCreate = new Card(item, '.cardTemplate', openClickedPicture, openPopupDelete, putLikeCard, deleteLikeCard);
		const cardElement = cardfromCreate.createNewCard();
		cardList.addItem(cardElement);
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
		evt.submitter.textContent = 'Создание...';
		api.addNewCard(newData)
		.then(res=> {
			cardList.renderer([res]);
			// console.log(res);
		})
		.finally(()=>evt.submitter.textContent = 'Создать');
		formCreateCardSubmit.close();
	}}
	 );
formCreateCardSubmit.setEventListeners();

function openPopupCreateCard (){
formCreateCardSubmit.open();
formElementCreateValidation.disableButton();
}
createButton.addEventListener('click', openPopupCreateCard); 

// Редактирование профайла
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
		evt.submitter.textContent = 'Сохранение...';
		api.editProfileData(newData.name, newData.profession)
		// .then(res=> {
		// console.log(res);
		// })
		.finally(()=>evt.submitter.textContent = 'Сохранить');
		userData.setUserInfo(newData.name, newData.profession);
		formEditProfileSubmit.close();
	}}
	 );

formEditProfileSubmit.setEventListeners();
editButton.addEventListener('click', openPopupdEditProfile);

